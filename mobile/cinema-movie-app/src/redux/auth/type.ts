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
  userCurrent: any;
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
