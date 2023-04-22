package com.service;

import org.springframework.data.repository.query.Param;

public interface BookingService {

    void saveBooking(String bookingCode, int point, int received, double totalPrice,
                     long accountId, long paymentId, long promotionId);

    void saveBookingSeat(long bookingId, long seatId);
}
