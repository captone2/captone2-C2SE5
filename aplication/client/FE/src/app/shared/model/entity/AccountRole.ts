import {Account} from './Account';
import {Role} from './Role';
import {JsonProperty} from 'jsog-typescript';
import {MovieShowtime} from './MovieShowtime';

export class AccountRole {
  id: number;
  account: Account;
  role: Role;

  constructor(id: number, account: Account, role: Role) {
    this.id = id;
    this.account = account;
    this.role = role;
  }
}
