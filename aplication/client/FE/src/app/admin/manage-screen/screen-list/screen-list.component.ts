
import { EmployeeAccountService } from './../../../services/employee-account.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ScreenService} from '../../../services/ScreenService';
import {Screen} from '../../../shared/model/entity/Screen';
import {ScreenDTO} from '../../../shared/model/dto/ScreenDTO';
import {JsogService} from 'jsog-typescript';
import {ToastrService} from 'ngx-toastr';
import { MovieService } from 'src/app/services/movie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-screen-list',
  templateUrl: './screen-list.component.html',
  styleUrls: ['./screen-list.component.css']
})
export class ScreenListComponent implements OnInit {
  page: 1;
  keyWord = null;
  pageSize: number = 5; 
  currentPage: number = 1; 
  screenList: Screen[];
  createScreen: FormGroup;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(
    private screenService: MovieService,
    private jsogService: JsogService,
    private toastrService: ToastrService,
    private employeeService: EmployeeAccountService,
    private form: FormBuilder,
    private toastService: ToastrService,
  ) { }

  validation_messages = {
    name: [
      { type: 'required', message: 'Please describe the name of the screen.' },
      { type: 'pattern', message: 'Invalid screen name, no special characters.' },
      { type: 'minlength', message: 'Screen name must enter at least 1 characters.' },
      { type: 'maxlength', message: 'Screen name can enter up to 100 characters.' }
    ],
    totalSeat: [
      { type: 'required', message: 'Please the total seat of the screnn.' },
      { type: 'min', message: 'Minimum number of seats 16.' },
      { type: 'max', message: 'Maximum number of seats 300.' }
    ],
  
  };


  ngOnInit(): void {
    this.createScreen = this.form.group({
      name: ['', [Validators.required, Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\>|\?|\/|\""|\;]*$/),
      Validators.minLength(1), Validators.maxLength(100)]],
      totalSeat: ['', [Validators.required,
      Validators.min(16), Validators.max(300)]],
     
    });
    this.screenService.getAllScreen().subscribe(
      (data) => {
         this.screenList = data;
         console.log(data)
      }
    );
  }


  onSubmitCreate() {
    console.log("Create")
    const screen = new ScreenDTO();
    screen.name = this.createScreen.value.name;
    screen.totalSeat = this.createScreen.value.totalSeat;
    this.employeeService.createScreen(screen).subscribe((data) => {
      this.toastService.success('Add new food successfully!', 'Success:');
      this.closeModal();
      this.ngOnInit();
    }, (error) => {
      this.toastService.error('Add new food unsuccessfully!', 'Error:');
    });
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
}
