package com.model.dto;

public class BookingCheck {
    private long id;
    private String bookingCode;

    public BookingCheck() {
    }

    public BookingCheck(long id, String bookingCode) {
        this.id = id;
        this.bookingCode = bookingCode;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getBookingCode() {
        return bookingCode;
    }

    public void setBookingCode(String bookingCode) {
        this.bookingCode = bookingCode;
    }
}
