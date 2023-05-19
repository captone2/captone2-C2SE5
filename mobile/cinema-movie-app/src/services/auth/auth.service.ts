import { Endpoints } from "../../api/endpoints";
import { LoginInfo, Password, UserState } from "../../redux/auth/type";
import { axiosClient, responseBody } from "./../../api/axios";
import axios from "axios";

export class UserService {
  static prefix = "auth";
  static login(body: LoginInfo): Promise<UserState> {
    return axiosClient.post(Endpoints.PREFIX + `${this.prefix}/signin`, body).then(responseBody);
  }

  static updatePassword(id: number, body: Password): Promise<any> {
    return axiosClient.patch(Endpoints.PREFIX + `update/password/${id}`, body).then(responseBody);
  }

  static getAccountById(id: number): Promise<any> {
    return axiosClient.get(Endpoints.PREFIX + `account/${id}`).then(responseBody);
  }
}
