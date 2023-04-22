package com.service;

import com.model.dto.AccountMemberDTO;

import com.model.dto.Viet.AccountUserDTO;
import com.model.dto.Viet.ManagerBooking;
import com.model.entity.Account;

import com.model.dto.employeeAccount.CreateEmployeeAccount;
import com.model.dto.employeeAccount.UpdateEmployeeAccount;


import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;


public interface AccountService {


    List<Account> listAccountByCodeEmployee();
    Account findAccountById(Long id);
    List<Account> findAllMember();
    void updateMember(AccountMemberDTO accountMemberDTO, long id);
    void createMember(AccountMemberDTO accountMemberDTO);
    void deleteMember(long id);
    Account findByIdMember(long id);
    List<Account> findByNameMember(String name);
    boolean checkEmailMember(String email);
    boolean checkPhoneMember(String phone);
    boolean checkUsernameMember(String username);



    Account findAccountUpdateById(long id);
    List<Account> findAll();
    void updateAccount(AccountUserDTO accountDTO);
    List<ManagerBooking> ManagerTickets();
    List<ManagerBooking> findAllBookByIdAccount(String idAccount);

    void changePassword(AccountUserDTO accountDTO);
    Boolean findAccountByVerificationCode(String code);
    String existsByUserName(String username);
    Boolean findAccountByVerificationCodeToResetPassword(String code);
    void saveNewPassword(String password,String code);
    void addVerificationCode(String username) throws MessagingException, UnsupportedEncodingException;

    List<Account> getAllEmployeeAccount();

    Account getAccountById(long id);

    void updateEmployeeAccount(UpdateEmployeeAccount updateEmployeeAccount);

    void createEmployeeAccount(CreateEmployeeAccount createEmployeeAccount);
    void createAccountRole(long accountId, long roleId);

    Account findAccountByEmployeeName(String accountCode);

    void deleteEmployeeAccountById(Long id);
    List<Account> findEmployeeAccountByFullNameOrAccountCode(String keyWord);

    boolean checkEmailEmployee(String email);
    boolean checkPhoneEmployee(String phone);
    boolean checkUsernameEmployee(String username);
    boolean checkAccountCodeEmployee(String accountCode);


}
