import { Endpoints } from "../../api/endpoints";
import { BookingDTO, BookingRequest, FoodResponse } from "../../redux/booking/type";
import { responseBody } from "./../../api/axios";
import axios from "axios";

export class BookingService {
  static prefix = "auth/booking";
  static getBookingByBookingCode(body: BookingRequest): Promise<BookingDTO> {
    return axios
      .post(Endpoints.PREFIX + `${this.prefix}/get-booking-by-code`, {
        bookingCode: body,
      })
      .then(responseBody);
  }

  static setTicketBookingReceived(body: BookingRequest): Promise<void> {
    return axios.post(Endpoints.PREFIX + `${this.prefix}/received-booking`, { id: body }).then(responseBody);
  }

  static seatBookedByShowTime(id: number): Promise<number[]> {
    return axios.get(Endpoints.PREFIX + `${this.prefix}/seatByShowTime/${id}`).then(responseBody);
  }

  static getAllFood(): Promise<FoodResponse[]> {
    return axios.get(`${Endpoints.PREFIX}auth/food/findAll`).then(responseBody);
  }

  //TODO:
  static getAllBookingByAccount(id: number): Promise<BookingDTO[]> {
    return axios.get(`${Endpoints.PREFIX}${this.prefix}/account/${id}`).then(responseBody);
  }

  static addBooking(body: any): Promise<any[]> {
    return axios.post(`${Endpoints.PREFIX}${this.prefix}`, { addBooking: body }).then(responseBody);
  }
}
