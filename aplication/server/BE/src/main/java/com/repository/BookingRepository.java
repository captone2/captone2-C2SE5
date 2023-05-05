package com.repository;

import com.model.entity.Booking;
;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional

public interface BookingRepository extends JpaRepository<Booking, Long> {


    @Modifying
    @Query(value = "INSERT INTO booking (booking_code, day_time_booking, received, total_price, account_id, payment_id, movie_showtime_id, img_qr_code)\n" +
            "    VALUES (:bookingCode, :dayTimeBooking, 0, :totalPrice, :accountId, 1, :movieShowTimeId, :imgQrCode)", nativeQuery = true)
    void saveBooking(@Param("bookingCode") String bookingCode,
                     @Param("dayTimeBooking") String point,
                     @Param("totalPrice") double totalPrice,
                     @Param("accountId") long accountId,
                     @Param("movieShowTimeId") long paymentId,
                     @Param("imgQrCode") String imgQrCode);


    @Query(value = "select * from booking where booking_code like :code", nativeQuery = true)
    Booking getBookingByBookingCode(@Param("code") String code);

    @Modifying
    @Query(value = "insert into booking_seat values (:seatId,:bookingId)", nativeQuery = true)
    void saveBookingSeat(@Param("seatId") Integer seatId,@Param("bookingId") Long bookingId );

    @Modifying
    @Query(value = "insert into booking_food (total,booking_id,food_id) values (:total,:bookingId,:foodId)", nativeQuery = true)
    void saveBookingFood(@Param("total") Integer total,@Param("bookingId") Long bookingId, @Param("foodId") Integer foodId);


    @Query(value = "select booking_seat.seat_id from booking_seat\n" +
            "join seat on booking_seat.seat_id = seat.id\n" +
            "join movie_show_time on movie_show_time.screen_id = seat.screen_id\n" +
            "where movie_show_time.id = :id", nativeQuery = true)
    List<Integer> getSeatByShowTimeId(@Param("id") Integer id);


    @Query(value = "select * from booking where account_id = :id", nativeQuery = true)
    List<Booking> getBookingByAccountId(@Param("id") Integer id);

}
