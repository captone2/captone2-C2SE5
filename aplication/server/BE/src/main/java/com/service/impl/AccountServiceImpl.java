package com.service.impl;


import com.model.dto.AccountMemberDTO;
import com.model.dto.Sy.AccountUserDTO;
import com.model.dto.Sy.ManagerBooking;
import com.model.entity.Account;
import com.model.entity.DataMail;
import com.repository.AccountRepository;
import com.model.dto.employeeAccount.CreateEmployeeAccount;
import com.model.dto.employeeAccount.UpdateEmployeeAccount;
import com.repository.RoleRepository;
import com.service.AccountService;
import com.service.IDataMailService;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    private IDataMailService dataMailService;

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


    @Override
    public void saveNewPassword(String password, String code) {
        accountRepository.saveNewPassword(password,code);

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
    public List<Account> findAllMember() {
        return accountRepository.findAllMember();
    }

    @Override
    public void updateMember(AccountMemberDTO accountMemberDTO, long id) {

    }

    @Override
    public void createMember(AccountMemberDTO accountMemberDTO) {

    }

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


    @Override
    public void createEmployeeAccount(CreateEmployeeAccount createEmployeeAccount) {

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
    public Account findAccountByVerificationCode(String code) {
        return accountRepository.findAccountByVerificationCode(code);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return accountRepository.existsByEmail(email);
    }

    @Override
    public void addVerificationCode(String code, Long id) {
        accountRepository.addVerificationCode(code, id);
    }

    @Override
    public Optional<Account> findByEmail(String username) {
        return accountRepository.findByEmail1(username);
    }


    @Override
    public void sendMail(String code, Optional<Account> account){
        try {
                DataMail dataMail = new DataMail();
            dataMail.setTo(account.get().getEmail());
            dataMail.setSubject("Activate " +account.get().getUsername());
            Map<String, Object> props = new HashMap<>();
            props.put("code", code);
            props.put("email", account.get().getEmail());
            dataMail.setProps(props);
            dataMailService.sendMail(dataMail,"ResetPassword");;
        } catch (MessagingException exp){
            exp.printStackTrace();
        }
        System.out.println("Send success!!");
    }
}




