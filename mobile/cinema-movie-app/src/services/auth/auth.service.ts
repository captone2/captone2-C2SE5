import axios from "axios";
import { LoginInfo, UserState } from "../../redux/auth/type";
import { Endpoints } from "../../api/endpoints";

export class UserService {
  static prefix = "/auth";
  static login(body: LoginInfo): Promise<UserState> {
    return axios.post(`${Endpoints + this.prefix}/signin`, body);
  }
}
