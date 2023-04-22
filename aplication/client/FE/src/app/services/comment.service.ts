import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Comment} from '../shared/model/entity/Comment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly COMMENT_URL = 'http://localhost:8080/api/comment';

  constructor(private httpClient: HttpClient) {
  }

  //  TuHC - lay comment cua 1 bo phim
  public getCommentByMovieId(id: number): Observable<any> {
    return this.httpClient.get(this.COMMENT_URL + '/get-comment/' + id);
  }

// TuHC - them comment
  public addComment(comment: Comment) {
    return this.httpClient.post(this.COMMENT_URL + '/add-comment', comment);
  }
}
