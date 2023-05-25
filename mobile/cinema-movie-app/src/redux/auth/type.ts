import { Error } from "../types";

export enum ActionType {
  LOGIN = "LOGIN",
  SESSION = "SESSION",
  GET_ACCOUNT_BY_ID = "GET_ACCOUNT_BY_ID",
}

export enum UserType {
  CUSTOMER = "ROLE_USER",
  ADMIN = "ROLE_ADMIN",
  EMPLOYEE = "ROLE_EMPLOYEE",
}

export interface LoginInfo {
  email: string;
  password: string;
}

interface UserInfo2 {
  id: number;
  displayName: string;
  email: string;
  roles: string[];
}
export interface UserInfo {
  accessToken: string;
  user: UserInfo2;
  userCurrent: Account;
}

export interface UserState {
  user: UserInfo;
  errors: Error[];
}

export interface Password {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateAccount {
  address: string;
  birthday: Date | string;
  fullname: string;
  gender: boolean;
  phone: string;
}

export interface Account {
  accountCode: string;
  address: string;
  birthday: string;
  createAt: string;
  email: string;
  enabled: boolean;
  fullname: string;
  gender: boolean;
  id: number;
  idCard: string;
  imageUrl: string;
  password: string;
  phone: string;
  provider: string;
  totalPoint: number;
  username: string;
  verificationCode: string;
}
