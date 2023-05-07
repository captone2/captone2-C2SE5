import { LoginInfo, UserState } from "../../redux/auth/type";
import { axiosClient, responseBody } from "./../../api/axios";
import axios from "axios";

export class UserService {
  static prefix = "https://d6d2-14-238-236-228.ap.ngrok.io/api/auth";
  // https://7975-14-238-236-228.ap.ngrok.io/api/
  static login(body: LoginInfo): Promise<UserState> {
    return axios.post(`${this.prefix}/signin`, body).then(responseBody);
  }
}
