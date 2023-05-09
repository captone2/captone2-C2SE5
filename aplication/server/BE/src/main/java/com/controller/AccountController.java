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
import net.bytebuddy.utility.RandomString;
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
    private RoleRepository roleRepository;

    @Autowired
    AccountRepository accountRepository;

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
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Xóa nhân viên theo id  nhân viên
    @DeleteMapping(value = "employee-account-delete/{id}")
    public ResponseEntity<?> deleteByEmployeeId(@PathVariable Long id) {
        if (id == null) {
            return ResponseEntity.badRequest().body("Không có tài khoản này !");
        }
        accountService.deleteEmployeeAccountById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/check-email-employee")
    public boolean checkEmailEmployee(@RequestBody String email) {
        return accountService.checkEmailEmployee(email);
    }


    @PostMapping("/check-phone-employee")
    public boolean checkPhoneEmployee(@RequestBody String phone) {
        return accountService.checkPhoneEmployee(phone);
    }


    @PostMapping("/check-username-employee")
    public boolean checkUsernameEmployee(@RequestBody String username) {
        return accountService.checkUsernameEmployee(username);
    }

    @GetMapping("/list-member")
    public ResponseEntity<List<Account>> getAllMember() {
        List<Account> accounts = accountService.findAllMember();
        if (accounts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Account>>(accounts, HttpStatus.OK);
    }


    @PutMapping("/update-member/{id}")
    public ResponseEntity<?> updateMember(@PathVariable("id") long id, @RequestBody AccountMemberDTO accountMemberDTO) {
        accountMemberDTO.setPassword(passwordEncoder.encode(accountMemberDTO.getPassword()));
        accountService.updateMember(accountMemberDTO, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/create-member")
    public ResponseEntity<?> createMember(@RequestBody AccountMemberDTO accountMemberDTO) {
        passwordEncoder.encode(accountMemberDTO.getPassword());
        accountService.createMember(accountMemberDTO);
        return new ResponseEntity<AccountMemberDTO>(HttpStatus.CREATED);
    }


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

    // lấy thông tin tài khoản bằng id

    @GetMapping(value = "/accountFindById/{id}")
    public ResponseEntity<Account> getUserById(@PathVariable long id) {
        System.out.print(id);
        Account account = accountService.findAccountUpdateById(id);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    // lấy tất cả User
    @GetMapping(value = "/account")
    public ResponseEntity<List<Account>> getAllUser() {

        List<Account> accountList = accountService.findAll();

        if (accountList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {

            return new ResponseEntity<>(accountList, HttpStatus.OK);
        }
    }

    //Update User
    @PutMapping(value = "/public/update/{id}")
    public ResponseEntity<AccountUserDTO> updateAccountUser(@PathVariable("id") long id, @RequestBody AccountUserDTO accountUserDTO) {
        Account account = accountService.findAccountUpdateById(id);
        System.out.println(id);

        if (account == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
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

    @PostMapping("/reset-password")
    public ResponseEntity<?> forgotPassword(@RequestBody LoginRequest loginRequest){
        System.out.println(1);
        if (accountService.existsByEmail(loginRequest.getUsername()) != null) {
            Optional<Account> user = accountService.findByEmail(loginRequest.getUsername());
            String code = RandomString.make(64);
            accountService.addVerificationCode(code, user.get().getId());
            String confirmUrl = "http://localhost:4200/verify-reset-password?code=" + code;
            accountService.sendMail(confirmUrl,user);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @PostMapping("/verify-password")
    public ResponseEntity<?> VerifyPassword(@RequestBody VerifyRequest code) {
        Account isVerified = accountService.findAccountByVerificationCode(code.getCode());
        System.out.println(isVerified.getVerificationCode());
        if (isVerified.getVerificationCode().equals(code.getCode())) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/do-forget-password")
    public ResponseEntity<?> doResetPassword(@RequestBody ResetPassRequest resetPassRequest) {
        accountService.saveNewPassword(passwordEncoder.encode(resetPassRequest.getPassword()), resetPassRequest.getCode());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}


