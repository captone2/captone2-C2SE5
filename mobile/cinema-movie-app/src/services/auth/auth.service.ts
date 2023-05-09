import { Endpoints } from "../../api/endpoints";
import { LoginInfo, UserState } from "../../redux/auth/type";
import { responseBody } from "./../../api/axios";
import axios from "axios";

export class UserService {
  static prefix = "auth";
  static login(body: LoginInfo): Promise<UserState> {
    return axios
      .post(Endpoints.PREFIX + `${this.prefix}/signin`, body)
      .then(responseBody);
  }
}
