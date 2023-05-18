import { Error } from "../types";

export enum ActionType {
  LOGIN = "LOGIN",
  SESSION = "SESSION",
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
  id: string;
  displayName: string;
  email: string;
  roles: string[];
}
export interface UserInfo {
  accessToken: string;
  user: UserInfo2;
}

export interface UserState {
  user: UserInfo;
  errors: Error[];
}
