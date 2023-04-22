import {AccountRole} from './AccountRole';
import {Comment} from './Comment';

export class Account {
  id: number;
  username: string;
  accountCode: string;
  password: string;
  fullname: string;
  birthday: string;
  idCard: string;
  address: string;
  phone: string;
  email: string;
  gender: string;
  totalPoint: number;
  imageUrl: string;
  deleted: boolean;
  accountRoles: AccountRole[];
  comments: Comment[];
  newPassword: string;
  confirmPassword: string;
}
