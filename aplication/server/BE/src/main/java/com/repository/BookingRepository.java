package com.repository;

import com.model.dto.TicketFoodDTO;
import com.model.dto.TopRateDTO;
import com.model.entity.Booking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import javax.persistence.Tuple;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface BookingRepository extends JpaRepository<Booking, Long> {



    @Query(value = "SELECT SUM(total_price - booking_food.total * food.price) as ticket, " +
            "SUM(total_price) - SUM(total_price - booking_food.total * food.price) as food " +
            "FROM booking " +
            "JOIN booking_food ON booking_food.booking_id = booking.id " +
            "JOIN food ON food.id = booking_food.food_id " +
            "WHERE YEAR(day_time_booking) = YEAR(CURRENT_DATE)", nativeQuery = true)
    Optional<Tuple> getTicketFoodData();

    default TicketFoodDTO getTicketFood() {
        Optional<Tuple> result = getTicketFoodData();
        if (result.isPresent()) {
            Tuple tuple = result.get();
            long ticket = ((Number) tuple.get("ticket")).longValue();
            long food = ((Number) tuple.get("food")).longValue();
            return new TicketFoodDTO(ticket, food);
        }
        return null;
    }


    @Query(value = "SELECT * FROM  booking \n" +
            "JOIN movie_show_time on  movie_show_time.id = booking.movie_showtime_id\n" +
            "WHERE booking.account_id = :account and movie_show_time.movie_id = :movie", nativeQuery = true)
    List<Booking> checkBookingComment(@Param("account") long accountId ,@Param("movie") long movieId);




    @Modifying
    @Query(value = "INSERT INTO booking (booking_code, day_time_booking, received, total_price, account_id, payment_id, movie_showtime_id, img_qr_code)\n" +
            "    VALUES (:bookingCode, :dayTimeBooking, 0, :totalPrice, :accountId, 1, :movieShowTimeId, :imgQrCode)", nativeQuery = true)
    void saveBooking(@Param("bookingCode") String bookingCode,
                     @Param("dayTimeBooking") String point,
                     @Param("totalPrice") double totalPrice,
                     @Param("accountId") long accountId,
                     @Param("movieShowTimeId") long paymentId,
                     @Param("imgQrCode") String imgQrCode);


    @Query(value = "select * from booking where received = false and booking_code like :code", nativeQuery = true)
    Booking getBookingByBookingCode(@Param("code") String code);

    @Modifying
    @Query(value = "insert into booking_seat values (:seatId,:bookingId)", nativeQuery = true)
    void saveBookingSeat(@Param("seatId") Integer seatId,@Param("bookingId") Long bookingId );

    @Modifying
    @Query(value = "insert into booking_food (total,booking_id,food_id) values (:total,:bookingId,:foodId)", nativeQuery = true)
    void saveBookingFood(@Param("total") Integer total,@Param("bookingId") Long bookingId, @Param("foodId") Integer foodId);

    @Query(value = "select booking_seat.seat_id from booking_seat\n" +
            "join booking on booking.id = booking_seat.booking_id\n" +
            "join seat on booking_seat.seat_id = seat.id\n" +
            "join movie_show_time on movie_show_time.screen_id = seat.screen_id\n" +
            "where movie_show_time.id = :id", nativeQuery = true)
    List<Integer> getSeatByShowTimeId(@Param("id") Integer id);


    @Query(value = "select * from booking where account_id = :id order by day_time_booking desc", nativeQuery = true)
    List<Booking> getBookingByAccountId(@Param("id") Integer id);

    @Modifying
    @Query(value = "UPDATE booking SET received = true where id =?1 ", nativeQuery = true)
    void setTicketBookingReceived(long id);


    @Query(value = "SELECT sum(total_price) FROM booking\n" +   
            "    WHERE YEAR(day_time_booking) = YEAR(NOW())", nativeQuery = true)
    Integer getRevenueByYear();


    @Query(value = "SELECT COUNT(email) FROM account \n" +
            "JOIN account_role on account_role.account_id = account.id \n" +
            "WHERE YEAR(create_at) = YEAR(NOW()) AND MONTH(create_at) = MONTH(NOW())", nativeQuery = true)
    Integer getAccountRegisterByMonth();




    @Query(value = "SELECT SUM(total_price) AS total_money FROM booking\n" +
            "    WHERE MONTH(day_time_booking) <= MONTH(NOW()) AND YEAR(day_time_booking) = YEAR(NOW())-1\n" +
            "    GROUP BY  MONTH(day_time_booking)\n" +
            "    ORDER BY MONTH(day_time_booking)", nativeQuery = true)
    Integer[] getRevenueLastYear();


    @Query(value = "SELECT SUM(total_price) AS total_money FROM booking\n" +
            "    WHERE MONTH(day_time_booking) <= MONTH(NOW()) AND YEAR(day_time_booking) = YEAR(NOW())\n" +
            "    GROUP BY  MONTH(day_time_booking)\n" +
            "    ORDER BY MONTH(day_time_booking)", nativeQuery = true)
    Integer[] getRevenueNowYear();


}
