package com.service;

import com.model.dto.AccountMemberDTO;

import com.model.dto.Sy.AccountUserDTO;
import com.model.dto.Sy.ManagerBooking;
import com.model.entity.Account;

import com.model.dto.employeeAccount.CreateEmployeeAccount;
import com.model.dto.employeeAccount.UpdateEmployeeAccount;


import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;


public interface AccountService {
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



    void saveNewPassword(String password,String code);


    List<Account> getAllEmployeeAccount();

    Account getAccountById(long id);

    void updateEmployeeAccount(UpdateEmployeeAccount updateEmployeeAccount);

    void createEmployeeAccount(CreateEmployeeAccount createEmployeeAccount);
    void deleteEmployeeAccountById(Long id);
    List<Account> findEmployeeAccountByFullNameOrAccountCode(String keyWord);

    boolean checkEmailEmployee(String email);
    boolean checkPhoneEmployee(String phone);
    boolean checkUsernameEmployee(String username);



    Account findAccountByVerificationCode(String code);
    void sendMail(String code, Optional<Account> account);
    Boolean existsByEmail(String username);
    void addVerificationCode(String code, Long id);
    Optional<Account> findByEmail(String username);
}
