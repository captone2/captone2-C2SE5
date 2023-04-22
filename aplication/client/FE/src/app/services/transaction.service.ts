import { Injectable } from '@angular/core';
import { Transaction } from '../shared/model/dto/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactions: Transaction[] = [];
  constructor() { }
}
