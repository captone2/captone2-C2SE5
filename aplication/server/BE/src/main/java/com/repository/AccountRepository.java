package com.repository;

import com.model.dto.Viet.ManagerBooking;
import com.model.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;


@Repository
public interface AccountRepository extends JpaRepository<Account,Long> {
    Account findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    boolean existsByUsername(String username);

    @Query(value = "select * from account where account_code like 'NV%';", nativeQuery = true)
    List<Account> listAccountByAccountCodeEmployee();


    Account findAccountByUsername(String username);

    @Transactional
    @Query(value = "SELECT  fullname , phone , email FROM account where id = ?1", nativeQuery = true)
    Account findAccountById(Long id);

    //PhapNT- Hiển thị danh sách thành viên.
    @Query(value = "select * from account inner join account_role on account.id = account_role.account_id " +
            "where account.deleted = true  and (account_role_test.role_id = 1) and (account_role_test.role_id != 3) and (account_role_test.role_id != 2)" , nativeQuery = true)
    List<Account> findAllMember();

    //PhapNT- Chỉnh sửa thành viên.
    @Transactional
    @Modifying
    @Query(value = "update account as a set a.account_code = ?1,  a.address = ?2, a.birthday = ?3 ," +
            " a.email = ?4, a.fullname=?5, a.gender=?6, a.id_card=?7, a.image_url=?8,a.password= ?9," +
            "a.phone = ?10, a.username = ?11 where a.id = ?12", nativeQuery = true)
    void updateMember(String account_code, String address, LocalDate birthday, String email, String fullname, String gender,
                      String idCard, String imageUrl, String password, String phone, String username, long id);

    //PhapNT- Thêm mới thành viên.
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO `movietheater`.`account` ( `account_code`, `address`, `birthday`, `deleted`," +
            " `email`, `fullname`, `gender`, `id_card`, `image_url`, `password`, `phone`, `total_point`, `username`)" +
            " VALUES (?1, ?2,?3,?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13)", nativeQuery = true)
    void createMember(String account_code, String address, LocalDate birthday, boolean deleted, String email, String fullname, String gender,
                      String id_card, String imagerUrl, String password, String phone, int totalPoint, String username);

    //PhapNT- Xóa thành viên.
    @Transactional
    @Modifying
    @Query(value = "update `account` set account.deleted = 1 where account.id=?1", nativeQuery = true)
    void deleteMember(long id);

    //PhapNT- Chi tiết thành viên.
    @Query(value = "select * from account where account.id= ?1", nativeQuery = true)
    Account findByIdMember(long id);

    //PhapNT-Tìm Kiếm theo tên
    @Query(value = "select * from account where account.fullname like %?1%", nativeQuery = true)
    List<Account> searchNameMember(String name);

    //Viet hiển thị account theo id
    @Transactional
    @Query(value = "SELECT * FROM account where id = ?1", nativeQuery = true)
    Account findAccountUpdateById(Long id);

    //Việt cập nhật thông tin người dùng
    @Transactional
    @Query(value = "SELECT * FROM account ", nativeQuery = true)
    List<Account> findAll();

    @Transactional
    @Modifying
    @Query(value = "  UPDATE account  SET account_code = ?1, address = ?2, birthday = ?3,email = ?4,fullname = ?5, gender = ?6,id_card = ?7,image_url = ?8,password = ?9,phone= ?10, total_point =?11,username=?12 WHERE id = ?13", nativeQuery = true)
    void updateAccountUser(String accountCode, String address, LocalDate birthday, String email, String fullname, String gender, String idCard, String imageUrl, String password, String phone, int totalPoint, String username, long id);

    //Việt quản lý vé người dùng
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
//Việt lấy danh sách theo account id

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

    // Việt đổi mật khẩu
    @Transactional
    @Modifying
    @Query(value = "  UPDATE account  SET account_code = ?1, address = ?2, birthday = ?3,email = ?4,fullname = ?5, gender = ?6,id_card = ?7,image_url = ?8,password = ?9,phone= ?10, total_point =?11,username=?12 WHERE id = ?13", nativeQuery = true)
    void changePassword(String accountCode, String address, LocalDate birthday, String email, String fullname, String gender, String idCard, String imageUrl, String password, String phone, int totalPoint, String username, long id);

    Account findAccountById(long id);
    // Danh sách nhân viên (HoangLV)
    @Query(value = "select * from account inner join account_role_test on account.id = account_role_test.account_id " +
            "where account.deleted = true  and (account_role_test.role_id = 3 or account_role_test.role_id = 2)", nativeQuery = true)
    List<Account> getAllAccountEmployee();

    // Lấy thông tin nhân viên theo id (HoangLV)
    @Query(value = "select * from account inner join account_role on account.id = account_role.id " +
            "where account.deleted = 1 and account_role.role_id = 2 and account.id = ?1 ", nativeQuery = true)
    Account getAccountById(long id);


    // Lấy thông tin người dùng theo họ và tên hoặc mã nhân viên
    @Query(value = "select * from `account`inner join account_role on account.id = account_role.id where account.deleted = 1 and account_role.role_id = 2 and account.fullname like %?1% or  account.account_code like %?1%", nativeQuery = true)
    List<Account> findEmployeeAccountByFullNameOrAccountCode(String search);

    //Sửa thông tin nhân viên (HoangLV)
    @Transactional
    @Modifying
    @Query(value = "update `account` as ac set ac.username = ?1 , ac.`password` = ?2 , ac.fullname = ?3, ac.birthday = ?4 , ac.gender = ?5 , ac.email = ?6 , ac.id_card = ?7 , ac.phone = ?8 ,ac.address = ?9 , ac.image_url = ?10 , ac.account_code = ?11 where ac.id = ?12 ;", nativeQuery = true)
    void updateEmployeeAccount(String username, String password, String fullname, LocalDate birthday, String gender, String email, String idCard, String phone, String address, String imageUrl, String accountCode, long id);


    //Thêm mới nhân viên
    @Transactional
    @Modifying
    @Query(value = "insert into account(`account_code`, `address`, `birthday`, `email`, `fullname`, `gender`, `id_card`, `image_url`, `password`, `phone`, `username`,`deleted`,`total_point`,`enable` ) values (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8,?9,?10,?11,?12,?13,?14)", nativeQuery = true)
    void createEmployeeAccount(String accountCode, String address, LocalDate birthday, String email, String fullname, String gender, String idCard, String imageUrl, String password, String phone, String username, boolean deleted, int totalPoint, boolean enable);

    //Thêm role cho nhân viên(HoangLV)
    @Transactional
    @Modifying
    @Query(value = "insert into account_role(account_id, role_id) values (?1, ?2)", nativeQuery = true)
    void createAccountRole(long accountId, long roleId);

    //Lấy nhân viên theo mã nhân viên(HoangLV)
    @Query(value = "select * from `account` where account_code = ?1 ", nativeQuery = true)
    Account findAccountByEmployeeName(String keyWord);


    //Xóa thông tin nhân viên HoangLV
    @Transactional
    @Modifying
    @Query(value = "update `account` set account.deleted = 0 where account.id=?1", nativeQuery = true)
    void deleteEmployeeAccountById(Long id);

    //HoangLV
    boolean existsAccountsByAccountCode(String accountCode);
    //VietNT
/*
    Account findAccountByUserName(String username);

    @Query(value = "select id from movietheater.account where username = ?1", nativeQuery = true)

    Integer findIdUserByUserName(String username);
*/

    @Query(value = "SELECT username from  movietheater.account where username = ?1", nativeQuery = true)

    String existsByUserName(String username);

    @Query(value = "SELECT email FROM movietheater.account where email= ?1", nativeQuery = true)
    String existsByEmailUser(String email);

    /*@Modifying
    @Query(value = "insert into account(user_name,encrypt_pw,is_enabled,verification_code,email) values (?1,?2,?3,?4,?5)", nativeQuery = true)
    void addNew(String username, String password, Boolean isEnable, String verifiedCode,String email);*/
    @Transactional
    @Query(value = "select * from movietheater.account where verification_code =?1",nativeQuery = true)
    Account findAccountByVerificationCode(String verifyCode);
    @Transactional
    @Modifying
    @Query(value ="update movietheater.account set verification_code=?1 where username =?2",nativeQuery = true)
    void addVerificationCode(String code,String username);
    @Transactional
    @Query(value = "select * from movietheater.account", nativeQuery = true)
    List<Account> getAllAccount();
    @Transactional
    @Modifying
    @Query(value = "insert into account(username,password) values (?1,?2)", nativeQuery = true)
    void addNewAccount(String username, String password);
    @Transactional
    @Modifying
    @Query(value = "update account set password =?1,verification_code=null where verification_code=?2 ",nativeQuery = true)
    void saveNewPassword(String password, String code);
}