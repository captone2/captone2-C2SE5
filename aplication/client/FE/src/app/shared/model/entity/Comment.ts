import {Movie} from './Movie';
import {Account} from './Account';
import {JsonProperty} from 'jsog-typescript';

export class Comment {
  id: number;
  content: string;
  seen: number;
  movie: Movie;
  account: Account;


  constructor(id: number, content: string, seen: number, movie: Movie, account: Account) {
    this.id = id;
    this.content = content;
    this.seen = seen;
    this.movie = movie;
    this.account = account;
  }
}
