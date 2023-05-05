package com.service.impl;


import com.model.dto.AccountMemberDTO;
import com.model.dto.Sy.AccountUserDTO;
import com.model.dto.Sy.ManagerBooking;
import com.model.entity.Account;
import com.repository.AccountRepository;
import com.model.dto.employeeAccount.CreateEmployeeAccount;
import com.model.dto.employeeAccount.UpdateEmployeeAccount;
import com.repository.RoleRepository;
import com.service.AccountService;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.List;


@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    JavaMailSender javaMailSender;

    private RoleRepository roleRepository;

    @Override
    public Account findAccountUpdateById(long id) {
        return accountRepository.findAccountUpdateById(id);
    }

    @Override
    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    @Override
    public void updateAccount(AccountUserDTO accountDTO) {

    }

//    @Override
//    public void updateAccount(AccountUserDTO accountUserDTO) {
//        accountRepository.updateAccountUser(accountUserDTO.getAccountCode(), accountUserDTO.getAddress(), accountUserDTO.getBirthday(), accountUserDTO.getEmail(), accountUserDTO.getFullname(), accountUserDTO.getGender(), accountUserDTO.getIdCard(), accountUserDTO.getImageUrl(), accountUserDTO.getPassword(), accountUserDTO.getPhone(), accountUserDTO.getTotalPoint(), accountUserDTO.getUsername(), accountUserDTO.getId());
//    }




    @Override
    public List<ManagerBooking> ManagerTickets() {
        return accountRepository.ManagerTickets();
    }


    @Override
    public List<ManagerBooking> findAllBookByIdAccount(String idAccount) {
        return accountRepository.findAllFeedbackBookByIdAccount(idAccount);
    }

    @Override
    public void changePassword(AccountUserDTO accountDTO) {

    }


//    @Override
//    public void changePassword(AccountUserDTO accountUserDTO) {
//        accountRepository.changePassword(accountUserDTO.getAccountCode(), accountUserDTO.getAddress(), accountUserDTO.getBirthday(), accountUserDTO.getEmail(), accountUserDTO.getFullname(), accountUserDTO.getGender(), accountUserDTO.getIdCard(), accountUserDTO.getImageUrl(), accountUserDTO.getPassword(), accountUserDTO.getPhone(), accountUserDTO.getTotalPoint(), accountUserDTO.getUsername(), accountUserDTO.getId());
//    }

    @Override
    public Boolean findAccountByVerificationCode(String code) {
        return null;
    }

//    @Override
//    public Boolean findAccountByVerificationCode(String code) {
//        Account account = accountRepository.findAccountByVerificationCode(code);
//        if (account == null || account.getEnabled()) {
//            return false;
//        } else {
//            account.setEnabled(true);
//            account.setVerificationCode(null);
//            accountRepository.save(account);
//            return true;
//        }
//    }

    @Override
    public String existsByUserName(String username) {
        return accountRepository.existsByUserName(username);
    }

    @Override
    public Boolean findAccountByVerificationCodeToResetPassword(String code) {
        Account account = accountRepository.findAccountByVerificationCode(code);
        return account != null;

    }

    @Override
    public void saveNewPassword(String password, String code) {
        accountRepository.saveNewPassword(password,code);

    }

    @Override
    public void addVerificationCode(String username) throws MessagingException, UnsupportedEncodingException {
        String code = RandomString.make(64);
        accountRepository.addVerificationCode(code, username);
        Account account = accountRepository.findAccountByVerificationCode(code);
        this.sendVerificationEmailForResetPassWord(account.getUsername(), code, account.getEmail());
    }



    public void sendVerificationEmailForResetPassWord(String userName, String randomCode, String email) throws MessagingException, UnsupportedEncodingException {
        String subject = "Hãy xác thực email của bạn";
        String mailContent = "";
        String confirmUrl = "http://localhost:4200/verify-reset-password?code=" + randomCode;


        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        helper.setFrom("anht19102000@gmail.com","RẠP PHIM A0920I1");
        helper.setTo(email);
        helper.setSubject(subject);
        mailContent = "<p sytle='color:red;'>Xin chào " + userName + " ,<p>" + "<p> Nhấn vào link sau để xác thực email của bạn:</p>" +
                "<h3><a href='" + confirmUrl + "'>Link Xác thực( nhấn vào đây)!</a></h3>" +
                "<p>RẠP PHIM  XIN CẢM ƠN</p>";
        helper.setText(mailContent, true);
        javaMailSender.send(message);
    }

    @Override
    public List<Account> listAccountByCodeEmployee() {
        return null;
    }

    @Override
    public Account findAccountById(Long id) {
        return accountRepository.findAccountById(id);
    }

    @Override
    public List<Account> findAllMember() {
        return accountRepository.findAllMember();
    }

    @Override
    public void updateMember(AccountMemberDTO accountMemberDTO, long id) {

    }

    @Override
    public void createMember(AccountMemberDTO accountMemberDTO) {

    }


//    @Override
//    public void updateMember(AccountMemberDTO accountMemberDTO, long id) {
//        accountRepository.updateMember(accountMemberDTO.getAccountCode(), accountMemberDTO.getAddress(), accountMemberDTO.getBirthday(),
//                accountMemberDTO.getEmail(), accountMemberDTO.getFullname(), accountMemberDTO.getGender(), accountMemberDTO.getIdCard(),
//                accountMemberDTO.getImageUrl(), accountMemberDTO.getPassword(), accountMemberDTO.getPhone(), accountMemberDTO.getUsername(),
//                id);
//    }
//
//    @Override
//    public void createMember(AccountMemberDTO accountMemberDTO) {
//        accountRepository.createMember(accountMemberDTO.getAccountCode(), accountMemberDTO.getAddress(), accountMemberDTO.getBirthday(),
//                accountMemberDTO.isDeleted(), accountMemberDTO.getEmail(), accountMemberDTO.getFullname(), accountMemberDTO.getGender(), accountMemberDTO.getIdCard(),
//                accountMemberDTO.getImageUrl(), accountMemberDTO.getPassword(), accountMemberDTO.getPhone(), accountMemberDTO.getTotalPoint(), accountMemberDTO.getUsername());
//    }

    @Override
    public void deleteMember(long id) {
        accountRepository.deleteMember(id);
    }

    @Override
    public Account findByIdMember(long id) {
        return accountRepository.findByIdMember(id);
    }

    @Override
    public List<Account> findByNameMember(String name) {
        return accountRepository.searchNameMember(name);
    }

    @Override
    public boolean checkEmailMember(String email) {
        return accountRepository.existsByEmail(email);
    }

    @Override
    public boolean checkPhoneMember(String phone) {
        return accountRepository.existsByPhone(phone);
    }

    @Override
    public boolean checkUsernameMember(String username) {
        return accountRepository.existsByUsername(username);
    }


    @Override
    public List<Account> getAllEmployeeAccount() {
        List<Account> list = accountRepository.getAllAccountEmployee();
        System.out.println(list.size());
        for (Account value: list){
            System.out.println(value.getEmail());
        }
        return accountRepository.getAllAccountEmployee();
    }

    @Override
    public Account getAccountById(long id) {
        return accountRepository.findAccountById(id);
    }

    @Override
    public void updateEmployeeAccount(UpdateEmployeeAccount updateEmployeeAccount) {

    }


//    @Override
//    public void updateEmployeeAccount(UpdateEmployeeAccount updateEmployeeAccount) {
//        accountRepository.updateEmployeeAccount(updateEmployeeAccount.getUsername(),
//                updateEmployeeAccount.getPassword(),
//                updateEmployeeAccount.getFullname(),
//                updateEmployeeAccount.getBirthday(),
//                updateEmployeeAccount.getGender(),
//                updateEmployeeAccount.getEmail(),
//                updateEmployeeAccount.getIdCard(),
//                updateEmployeeAccount.getPhone(),
//                updateEmployeeAccount.getAddress(),
//                updateEmployeeAccount.getImageUrl(),
//                updateEmployeeAccount.getAccountCode(),
//                updateEmployeeAccount.getId());
//    }

    @Override
    public void createEmployeeAccount(CreateEmployeeAccount createEmployeeAccount) {

    }

//
//    @Override
//    public void createEmployeeAccount(CreateEmployeeAccount createEmployeeAccount) {
//
//
//        Account account = new Account();
//        account.setAccountCode(createEmployeeAccount.getAccountCode());
//        account.setAddress(createEmployeeAccount.getAddress());
//        account.setBirthday(createEmployeeAccount.getBirthday());
//        account.setEmail(createEmployeeAccount.getEmail());
//        account.setFullname(createEmployeeAccount.getFullname());
//        account.setGender(createEmployeeAccount.getGender());
//        account.setIdCard(createEmployeeAccount.getIdCard());
//        account.setImageUrl(createEmployeeAccount.getImageUrl());
//        account.setPassword(createEmployeeAccount.getPassword());
//        account.setPhone(createEmployeeAccount.getPhone());
//        account.setUsername(createEmployeeAccount.getUsername());
//        account.setDeleted(createEmployeeAccount.isDeleted());
//        account.setEnable(createEmployeeAccount.isEnable());
//        account.setTotalPoint(createEmployeeAccount.getTotalPoint());
//        account.setProvider(SocialProvider.LOCAL.getProviderType());
//        final HashSet<Role> roles = new HashSet<Role>();
//        roles.add(roleRepository.findByName(Role.ROLE_USER));
//        roles.add(roleRepository.findByName(Role.ROLE_MODERATOR));
//        account.setRoles(roles);
//
//
//        accountRepository.save(account);
//
//    }


    @Override
    public void createAccountRole(long accountId, long roleId) {
        accountRepository.createAccountRole(accountId, roleId);
    }

    @Override
    public Account findAccountByEmployeeName(String accountCode) {
        return null;
    }

    @Override
    public void deleteEmployeeAccountById(Long id) {
        accountRepository.deleteEmployeeAccountById(id);
    }

    @Override
    public List<Account> findEmployeeAccountByFullNameOrAccountCode(String keyWord) {
        return null;
    }

    @Override
    public boolean checkEmailEmployee(String email) {
        return accountRepository.existsByEmail(email);
    }

    @Override
    public boolean checkPhoneEmployee(String phone) {
        return accountRepository.existsByPhone(phone);
    }

    @Override
    public boolean checkUsernameEmployee(String username) {
        return accountRepository.existsByUsername(username);
    }

    @Override
    public boolean checkAccountCodeEmployee(String accountCode) {
        return false;
    }

}




