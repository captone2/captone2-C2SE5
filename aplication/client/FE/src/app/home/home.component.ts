
import { UserService } from '../services/user.service';
import { MovieService } from "../services/movie.service";
import { Movie } from "../shared/model/entity/Movie";
import { TokenStorageService } from '../services/token-storage.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Genre } from '../shared/model/entity/Genre';
import { SlidesOutputData } from 'ngx-owl-carousel-o';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChatWithBot, ResponseModel } from '../shared/model/gpt-response';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';
import { gptModels } from '../shared/model/constants';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
  ]
})
export class HomeComponent implements OnInit {


  chatConversation: ChatWithBot[] = [];
  response!: ResponseModel | undefined;
  gptModels = gptModels
  promptText = '';
  showSpinner = false;



  public movieList: Movie[];
  createMovie: FormGroup;
  @ViewChild('overlay') overlay: ElementRef;
  @ViewChild('modalPayment') modalPayment: ElementRef;
  @ViewChild('modalTrailer') modalTrailer: ElementRef;
  @ViewChild('videoMain') videoMain: ElementRef;
  constructor(private form: FormBuilder, private movieService: MovieService, private tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {


    this.movieService.getMovieShowing().subscribe((data) => {
      this.movieList = data;
      console.log(data)
    });
  }



  closeModal() {
    this.modalPayment.nativeElement.style.animation = 'topdown 0.5s ease-in-out forwards';
    this.modalTrailer.nativeElement.style.animation = 'topdown 0.5s ease-in-out forwards';
    this.videoMain.nativeElement.pause();
    this.overlay.nativeElement.style.display = 'none';
  }




  convertTime(id: number) {
    const minutes: number = id;
    const date: Date = new Date(0, 0, 0, 0, minutes);
    const hours: number = date.getHours();
    const formattedMinutes: string = ('0' + date.getMinutes()).slice(-2);
    const formattedTime: string = ('0' + hours).slice(-2) + ' hours ' + formattedMinutes + ' minutes';
    return formattedTime
  }

  convertGenre(arr: Genre[]) {
    return arr.map(genre => genre.name).join(', ');
  }



  checkResponse() {
    this.pushChatContent(this.promptText,'You','person');
    this.invokeGPT();
  }


  pushChatContent(content:string, person:string, cssClass:string) {
    const chatToPush: ChatWithBot = { person:person, response:content, cssClass:cssClass};
    this.chatConversation.push(chatToPush);
  }


  getText(data:string) {
    return data.split('\n').filter(f=>f.length>0);
  }

  async invokeGPT() {
   

    if(this.promptText.length<2)
    return;

    

    try{
      this.response = undefined;
      let configuration = new Configuration({apiKey: environment.apiKey});
      let openai = new OpenAIApi(configuration);

      let requestData={
        model: 'text-davinci-003',//'text-davinci-003',//"text-curie-001",
        prompt: this.promptText,//this.generatePrompt(animal),
        temperature: 0.95,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };
      this.showSpinner = true;
      let apiResponse =  await openai.createCompletion(requestData);

      this.response = apiResponse.data as ResponseModel;
      this.pushChatContent(this.response.choices[0].text.trim(),'Mr Bot','bot');
debugger;
      this.showSpinner = false;
      this.promptText = '';
    }catch(error) {
      this.showSpinner = false;
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        
      }
    }
  }
}
