import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CommentDTO} from '../shared/model/entity/CommentDTO';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly COMMENT_URL = 'http://localhost:8080/api/comment';

  constructor(private httpClient: HttpClient) {
  }

 
  public getCommentByMovieId(id: number): Observable<any> {
    return this.httpClient.get(this.COMMENT_URL + '/get-comment/' + id);
  }


  public addComment(comment: CommentDTO) {
    return this.httpClient.post(this.COMMENT_URL + '/add', comment);
  }
}
