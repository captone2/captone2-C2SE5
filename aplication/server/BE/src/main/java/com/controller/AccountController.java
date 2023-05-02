package com.controller;


import com.model.dto.AccountMemberDTO;
import com.model.dto.Password;
import com.model.dto.Sy.AccountUserDTO;
import com.model.dto.Sy.ManagerBooking;

import com.model.dto.employeeAccount.CreateEmployeeAccount;
import com.model.dto.employeeAccount.UpdateEmployeeAccount;

import com.model.entity.Account;
import com.repository.AccountRepository;
import com.repository.RoleRepository;
import com.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import payload.reponse.MessageResponse;
import payload.request.LoginRequest;
import payload.request.ResetPassRequest;
import payload.request.VerifyRequest;


import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin("http://localhost:4200")
public class AccountController {

    private @Autowired
    AccountService accountService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("account/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable("id") long id) {
        Account account = accountService.getAccountById(id);
        if (account == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    @PatchMapping("update/password/{id}")
    public ResponseEntity<?> updatePassword(@PathVariable("id") Long id, @RequestBody Password password) {

        Optional<Account> account = accountRepository.findAccountById1(id);
        if (!account.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            String originalPasswordEncode = account.get().getPassword();
            boolean checkPassword = passwordEncoder.matches(password.getOldPassword(), originalPasswordEncode);
            if (checkPassword) {
                if (!password.getNewPassword().equals(password.getConfirmPassword())) {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                } else {
                    String newPassWordEncode = new BCryptPasswordEncoder().encode(password.getNewPassword());
                    accountRepository.changePassword(id,newPassWordEncode);

                    return new ResponseEntity<>(HttpStatus.OK);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }


















    // danh sánh nhân viên (HoangLV)
    @GetMapping("employee-account-list")
    public ResponseEntity<List<Account>> getAllEmployee() {
        List<Account> listEmployeeDTOS = accountService.getAllEmployeeAccount();
        if (listEmployeeDTOS.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(listEmployeeDTOS, HttpStatus.OK);
        }
    }

    // tìm kiếm nhân viên (HoangLV)
    @GetMapping("search-employee")
    public ResponseEntity<List<Account>> searchMeetingRoomByName(@RequestParam(required = false) String keyWord) {
        List<Account> accounts = accountService.findEmployeeAccountByFullNameOrAccountCode(keyWord);
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }


    // get nhân viên theo id (HoangLV)
    @GetMapping("employee-account/{id}")
    public ResponseEntity<Account> getEmployeeById(@PathVariable("id") long id) {
        Account account = accountService.getAccountById(id);
        if (account == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(account, HttpStatus.OK);
    }


    // sửa thông tin nhân viên (HoangLV)
    @PutMapping("employee-account-edit")
    public ResponseEntity<?> updateEmployee(@RequestBody UpdateEmployeeAccount updateEmployeeAccount) {
        updateEmployeeAccount.setPassword(passwordEncoder.encode(updateEmployeeAccount.getPassword()));
        accountService.updateEmployeeAccount(updateEmployeeAccount);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // thêm mới nhân viên (HoangLV)
    @PostMapping(value = "employee-account-create", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createEmployee(@RequestBody CreateEmployeeAccount createEmployeeAccount) {
        if (createEmployeeAccount.getAccountCode() != null && createEmployeeAccount.getUsername() != null && createEmployeeAccount.getPassword() != null
                && createEmployeeAccount.getBirthday() != null && createEmployeeAccount.getGender() != null && createEmployeeAccount.getIdCard() != null
                && createEmployeeAccount.getEmail() != null && createEmployeeAccount.getAddress() != null && createEmployeeAccount.getFullname() != null
                && createEmployeeAccount.getIdCard() != null && createEmployeeAccount.getPhone() != null && createEmployeeAccount.getImageUrl() != null) {
            createEmployeeAccount.setDeleted(true);
            createEmployeeAccount.setEnable(true);
            createEmployeeAccount.setTotalPoint(0);
            createEmployeeAccount.setPassword(passwordEncoder.encode(createEmployeeAccount.getPassword()));
            accountService.createEmployeeAccount(createEmployeeAccount);

//            Account account = accountService.findAccountByEmployeeName(createEmployeeAccount.getAccountCode());
//
//            accountService.createAccountRole(account.getId(), 3);


            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Xóa nhân viên theo id  nhân viên (HoangLV)
    @DeleteMapping(value = "employee-account-delete/{id}")
    public ResponseEntity<?> deleteByEmployeeId(@PathVariable Long id) {
        if (id == null) {
            return ResponseEntity.badRequest().body("Không có tài khoản này !");
        }
        accountService.deleteEmployeeAccountById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // HoangLV
    @PostMapping("/check-email-employee")
    public boolean checkEmailEmployee(@RequestBody String email) {
        return accountService.checkEmailEmployee(email);
    }

    // HoangLV
    @PostMapping("/check-phone-employee")
    public boolean checkPhoneEmployee(@RequestBody String phone) {
        return accountService.checkPhoneEmployee(phone);
    }

    // HoangLV
    @PostMapping("/check-username-employee")
    public boolean checkUsernameEmployee(@RequestBody String username) {
        return accountService.checkUsernameEmployee(username);
    }

    // HoangLV
    @PostMapping("/check-accountCode-employee")
    public boolean checkAccountCodeEmployee(@RequestBody String accountCode) {
        System.out.println(accountCode);
        return accountService.checkAccountCodeEmployee(accountCode);
    }


    //PhapNT-Hiển thị danh sách thành viên.
    @GetMapping("/list-member")
    public ResponseEntity<List<Account>> getAllMember() {
        List<Account> accounts = accountService.findAllMember();
        if (accounts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Account>>(accounts, HttpStatus.OK);
    }

    //PhapNT- Chỉnh sửa thành viên
    @PutMapping("/update-member/{id}")
    public ResponseEntity<?> updateMember(@PathVariable("id") long id, @RequestBody AccountMemberDTO accountMemberDTO) {
        accountMemberDTO.setPassword(passwordEncoder.encode(accountMemberDTO.getPassword()));
        accountService.updateMember(accountMemberDTO, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //PhapNT- Thêm thành viên
    @PostMapping("/create-member")
    public ResponseEntity<?> createMember(@RequestBody AccountMemberDTO accountMemberDTO) {
        passwordEncoder.encode(accountMemberDTO.getPassword());
        accountService.createMember(accountMemberDTO);
        return new ResponseEntity<AccountMemberDTO>(HttpStatus.CREATED);
    }

    //PhapNT-
    @GetMapping("/public/findById-member/{id}")
    public ResponseEntity<Account> getIdMember(@PathVariable("id") long id) {
        Account accounts = accountService.findByIdMember(id);
        System.out.println();
        return new ResponseEntity<Account>(accounts, HttpStatus.OK);
    }

    @DeleteMapping("delete-member/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable("id") long id) {
        accountService.deleteMember(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("searchName-member")
    public ResponseEntity<List<Account>> searchNameMember(@RequestParam("name") String name) {
        List<Account> accounts = accountService.findByNameMember(name);
        return new ResponseEntity<List<Account>>(accounts, HttpStatus.OK);
    }

    @PostMapping("/check-emailMember")
    public boolean checkEmailMember(@RequestBody String email) {
        return accountService.checkEmailMember(email);

    }

    @PostMapping("/check-phoneMember")
    public boolean checkPhoneMember(@RequestBody String phone) {
        return accountService.checkPhoneMember(phone);
    }

    @PostMapping("/check-usernameMember")
    public boolean checkUsernameMember(@RequestBody String username) {
        return accountService.checkUsernameMember(username);
    }

    //ViệtNT lấy thông tin tài khoản bằng id 06/10/2021

    @GetMapping(value = "/accountFindById/{id}")
    public ResponseEntity<Account> getUserById(@PathVariable long id) {
        System.out.print(id);
        Account account = accountService.findAccountUpdateById(id);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    //VietNT lấy tất cả User 08/10/2021
    @GetMapping(value = "/account")
    public ResponseEntity<List<Account>> getAllUser() {

        List<Account> accountList = accountService.findAll();

        if (accountList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {

            return new ResponseEntity<>(accountList, HttpStatus.OK);
        }
    }

    //VietNT Update User
    @PutMapping(value = "/public/update/{id}")
    public ResponseEntity<AccountUserDTO> updateAccountUser(@PathVariable("id") long id, @RequestBody AccountUserDTO accountUserDTO) {
        Account account = accountService.findAccountUpdateById(id);
        System.out.println(id);

        if (account == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {


          /*  accountUserDTO.setPassword(passwordEncoder.encode(accountUserDTO.getPassword().trim()));*/
            System.out.println(accountUserDTO.getAccountCode().trim());
            accountUserDTO.setAccountCode(accountUserDTO.getAccountCode().trim());
            accountUserDTO.setAddress(accountUserDTO.getAddress().trim());
            accountUserDTO.setBirthday(accountUserDTO.getBirthday());
            accountUserDTO.setEmail(accountUserDTO.getEmail().trim());
            accountUserDTO.setFullname(accountUserDTO.getFullname().trim());
            accountUserDTO.setIdCard(accountUserDTO.getIdCard().trim());
            accountUserDTO.setUsername(accountUserDTO.getUsername().trim());
            accountService.updateAccount(accountUserDTO);

            return new ResponseEntity<>(accountUserDTO, HttpStatus.OK);
        }
    }

    // Việt lấy  danh sách booking
    @GetMapping(value = "/account/booking")
    public ResponseEntity<List<ManagerBooking>> managerTickets() {

        List<ManagerBooking> movieList = accountService.ManagerTickets();

        if (movieList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {

            return new ResponseEntity<>(movieList, HttpStatus.OK);
        }
    }

    //Việt lấy danh sách booking theo account
    @GetMapping(value = "/account/booking/{idAccount}")
    public List<ManagerBooking> getAllFeedbackByIdAccount(@PathVariable("idAccount") String idAccount) {
        List<ManagerBooking> managerBookingList = accountService.findAllBookByIdAccount(idAccount);
        return managerBookingList;

    }

    ///Việt đổi mật khẩu
    @PutMapping(value = "/public/changePassword/{id}")
    public ResponseEntity<AccountUserDTO> changePassWord(@PathVariable("id") long id, @RequestBody AccountUserDTO accountUserDTO) {
        Account account = accountService.findAccountUpdateById(id);
        System.out.println(id);

        if (account == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {

            accountService.changePassword(accountUserDTO);

            return new ResponseEntity<>(accountUserDTO, HttpStatus.OK);
        }
    }


    @PostMapping("/auth/verify")
    public ResponseEntity<?> VerifyEmail(@RequestBody VerifyRequest code) {
        Boolean isVerified = accountService.findAccountByVerificationCode(code.getCode());
        if (isVerified) {
            return ResponseEntity.ok(new MessageResponse("activated"));
        } else {
            return ResponseEntity.ok(new MessageResponse("error"));
        }
    }

    @PostMapping("/auth/reset-password")
    public ResponseEntity<?> reset(@RequestBody LoginRequest loginRequest) throws MessagingException, UnsupportedEncodingException {
        System.out.println("reset passsword");
        if (accountService.existsByUserName(loginRequest.getUsername()) != null) {
            accountService.addVerificationCode(loginRequest.getUsername());
            return ResponseEntity.ok(new MessageResponse("Sent email "));
        }
        return ResponseEntity
                .badRequest()
                .body(new MessageResponse("Tài khoản không đúng"));
    }

    @PostMapping("/auth/verify-password")
    public ResponseEntity<?> VerifyPassword(@RequestBody VerifyRequest code) {
        Boolean isVerified = accountService.findAccountByVerificationCodeToResetPassword(code.getCode());
        if (isVerified) {
            return ResponseEntity.ok(new MessageResponse("accepted"));
        } else {
            return ResponseEntity.ok(new MessageResponse("error"));
        }
    }

    @PostMapping("/auth/do-reset-password")
    public ResponseEntity<?> doResetPassword(@RequestBody ResetPassRequest resetPassRequest) {
        accountService.saveNewPassword(passwordEncoder.encode(resetPassRequest.getPassword()), resetPassRequest.getCode());
        return ResponseEntity.ok(new MessageResponse("success"));
    }
}


