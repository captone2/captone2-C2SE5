import { Error } from "../types";

export enum ActionType {
  LOGIN = "LOGIN",
  SESSION = "SESSION",
}

export enum CompanyType {
  CUSTOMER = "ROLE_USER",
  ADMIN = "ROLE_ADMIN",
  MODERATOR = "ROLE_MODERATOR",
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface UserInfo {
  id: string;
  displayName: string;
  email: string;
  accessToken: string;
  roles: string[];
}

export interface UserState {
  user: UserInfo;
  errors: Error[];
}
