package com.repository;

import com.model.dto.Sy.ManagerBooking;
import com.model.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Repository
public interface AccountRepository extends JpaRepository<Account,Long> {
    @Query(value = "select * from account where email = ?1",nativeQuery = true)
    Optional<Account> findByEmail1(String email);
    Account findByEmail(String email);
    Boolean existsByEmail(String username);
    boolean existsByPhone(String phone);
    boolean existsByUsername(String username);


    @Query(value = "SELECT * FROM account WHERE id = :id", nativeQuery = true)
    Optional<Account> findAccountById1(@Param("id") Long id);

    Account findAccountByUsername(String username);

    @Transactional
    @Query(value = "SELECT  fullname , phone , email FROM account where id = ?1", nativeQuery = true)
    Account findAccountById(Long id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE account SET password = ?2 WHERE id = ?1", nativeQuery = true)
    void changePassword(Long id,String password);

    @Query(value = "select * from account inner join account_role on account.id = account_role.account_id " +
            "where account.deleted = true  and (account_role.role_id = 1) and (account_role.role_id != 3) and (account_role.role_id != 2)" , nativeQuery = true)
    List<Account> findAllMember();



    @Transactional
    @Modifying
    @Query(value = "update `account` set account.deleted = 1 where account.id=?1", nativeQuery = true)
    void deleteMember(long id);


    @Query(value = "select * from account where account.id= ?1", nativeQuery = true)
    Account findByIdMember(long id);


    @Query(value = "select * from account where account.fullname like %?1%", nativeQuery = true)
    List<Account> searchNameMember(String name);


    @Transactional
    @Query(value = "SELECT * FROM account where id = ?1", nativeQuery = true)
    Account findAccountUpdateById(Long id);


    @Transactional
    @Query(value = "SELECT * FROM account ", nativeQuery = true)
    List<Account> findAll();


    @Transactional
    @Modifying
    @Query(value = "select movie.id , movie.title, booking.total_price, booking.day_time_booking, booking.received \n" +
            "from movie_showtime\n" +
            "inner join movie on movie.id = movie_showtime.movie_id\n" +
            "inner join showtime on showtime.id = movie_showtime.showtime_id\n" +
            "inner join screen on screen.showtime_id = showtime.id\n" +
            "inner join seat on seat.screen_id = screen.id\n" +
            "inner join booking_seat on booking_seat.seat_id = seat.id\n" +
            "inner join booking on booking_seat.booking_id = booking.id\n" +
            "group by movie.id ", nativeQuery = true)
    List<ManagerBooking> ManagerTickets();


    @Query(value = "select movie.id , movie.title, booking.total_price, booking.day_time_booking, booking.received \n" +
            "from movie_showtime\n" +
            "inner join movie on movie.id = movie_showtime.movie_id\n" +
            "inner join showtime on showtime.id = movie_showtime.showtime_id\n" +
            "inner join screen on screen.showtime_id = showtime.id\n" +
            "inner join seat on seat.screen_id = screen.id\n" +
            "inner join booking_seat on booking_seat.seat_id = seat.id\n" +
            "inner join booking on booking_seat.booking_id = booking.id\n" +
            "where booking.account_id = :idAccount \n" +
            "group by movie.id", nativeQuery = true)

    List<ManagerBooking> findAllFeedbackBookByIdAccount(@Param("idAccount") String idAccount);


    Account findAccountById(long id);
    @Query(value = "select account.* from account inner join account_role on account.id = account_role.account_id \n" +
            "            where account.is_enabled= 1  and (account_role.role_id = 3 )", nativeQuery = true)
    List<Account> getAllAccountEmployee();

    @Transactional
    @Modifying
    @Query(value = "insert into account_role(account_id, role_id) values (?1, ?2)", nativeQuery = true)
    void createAccountRole(long accountId, long roleId);

    @Transactional
    @Modifying
    @Query(value = "update `account` set enable = 0 where id=?1", nativeQuery = true)
    void deleteEmployeeAccountById(Long id);

    @Query(value = "SELECT username from  movietheater.account where username = ?1", nativeQuery = true)
    String existsByUserName(String username);

    Account findAccountByVerificationCode(String code);

    @Modifying
    @Query(value ="update account set verification_code =?1 where id =?2",nativeQuery = true)
    void addVerificationCode(String code, Long id);

    @Transactional
    @Modifying
    @Query(value = "update account set password =?1,verification_code=null where verification_code=?2 ",nativeQuery = true)
    void saveNewPassword(String password, String code);

}