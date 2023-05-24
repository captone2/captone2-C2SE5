import { Endpoints } from "../../api/endpoints";
import { AddBookingRequest, BookingDTO, BookingRequest, FoodResponse } from "../../redux/booking/type";
import { axiosClient, responseBody } from "../../api/axios";
import axios from "axios";

export class BookingService {
  static prefix = "auth/booking";
  static getBookingByBookingCode(body: BookingRequest): Promise<BookingDTO> {
    return axiosClient.post(Endpoints.PREFIX + `${this.prefix}/get-booking-by-code`, body).then(responseBody);
  }

  static setTicketBookingReceived(body: BookingRequest): Promise<void> {
    return axiosClient.post(Endpoints.PREFIX + `${this.prefix}/received-booking`, body).then(responseBody);
  }

  static seatBookedByShowTime(showtimeId: number): Promise<number[]> {
    return axiosClient.get(Endpoints.PREFIX + `seat/get-seat/${showtimeId}`).then(responseBody);
  }

  static getAllFood(): Promise<FoodResponse[]> {
    return axiosClient.get(`${Endpoints.PREFIX}auth/food/getAll`).then(responseBody);
  }

  static getAllBookingByAccount(id: number): Promise<BookingDTO[]> {
    return axiosClient.get(`${Endpoints.PREFIX}${this.prefix}/account/${id}`).then(responseBody);
  }

  static addBooking(body: AddBookingRequest): Promise<void> {
    return axiosClient.post(`${Endpoints.PREFIX}${this.prefix}`, body).then(responseBody);
  }

  //TODO:
  //   number is number Seat id, id: booking code
  static addSeatByBookingCode(body: { numbers: number[]; id: string }): Promise<void> {
    return axiosClient.post(`${Endpoints.PREFIX}${this.prefix}/seat`, body).then(responseBody);
  }
}
