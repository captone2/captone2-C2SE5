import { Endpoints } from "../../api/endpoints";
import { BookingRequest } from "../../redux/booking/type";
import { responseBody } from "./../../api/axios";
import axios from "axios";

export class BookingService {
  static prefix = "auth/booking";
  static getBookingByBookingCode(body: BookingRequest): Promise<any> {
    return axios
      .post(Endpoints.PREFIX + `${this.prefix}/get-booking-by-code`, {
        bookingCode: body,
      })
      .then(responseBody);
  }

  static setTicketBookingReceived(body: BookingRequest): Promise<any> {
    return axios.post(Endpoints.PREFIX + `${this.prefix}/received-booking`, { id: body }).then(responseBody);
  }

  static seatBookedByShowTime(id: number): Promise<number[]> {
    return axios.get(Endpoints.PREFIX + `${this.prefix}/seatByShowTime/${id}`).then(responseBody);
  }
}
