import { Endpoints } from "../../api/endpoints";
import { responseBody } from "./../../api/axios";
import axios from "axios";

export class MovieService {
  static prefix = "";
  static findAllMovie(title?: string): Promise<any> {
    return axios
      .get(Endpoints.PREFIX + `list-movie?title=${title}`)
      .then(responseBody);
  }

  static findMovieById(id: number): Promise<any> {
    return axios.get(Endpoints.PREFIX + `list/${id}`).then(responseBody);
  }
}
