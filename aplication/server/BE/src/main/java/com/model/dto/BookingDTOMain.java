package com.model.dto;

public class BookingDTOMain {

    private String dayTimeBooking;
    private Double totalPrice;
    private Long accountId;
    private Long movieShowTimeId;
    private String bookingCode;
    private String urlQrCode;
    public BookingDTOMain() {
    }

    public String getDayTimeBooking() {
        return dayTimeBooking;
    }

    public void setDayTimeBooking(String dayTimeBooking) {
        this.dayTimeBooking = dayTimeBooking;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Long getMovieShowTimeId() {
        return movieShowTimeId;
    }

    public void setMovieShowTimeId(Long movieShowTimeId) {
        this.movieShowTimeId = movieShowTimeId;
    }

    public String getBookingCode() {
        return bookingCode;
    }

    public void setBookingCode(String bookingCode) {
        this.bookingCode = bookingCode;
    }

    public String getUrlQrCode() {
        return urlQrCode;
    }

    public void setUrlQrCode(String urlQrCode) {
        this.urlQrCode = urlQrCode;
    }
}
