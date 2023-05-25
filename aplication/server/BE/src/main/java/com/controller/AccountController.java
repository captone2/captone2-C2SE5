package com.controller;


import com.model.dto.Password;
import com.model.dto.Sy.AccountUserDTO;
import com.model.dto.employeeAccount.CreateEmployeeAccount;
import com.model.dto.employeeAccount.UpdateAccountDTO;
import com.model.entity.Account;
import com.repository.AccountRepository;
import com.repository.RoleRepository;
import com.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import payload.request.ResetPassRequest;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin("**")
public class AccountController {

    @Autowired
    AccountRepository accountRepository;
    private @Autowired
    AccountService accountService;
    @Autowired
    private RoleRepository roleRepository;
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
                    accountRepository.changePassword(id, newPassWordEncode);

                    return new ResponseEntity<>(HttpStatus.OK);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
    }

    @GetMapping("employee-list")
    public ResponseEntity<List<Account>> getAllEmployee() {
        List<Account> listEmployeeDTOS = accountService.getAllEmployeeAccount();
        if (listEmployeeDTOS.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(listEmployeeDTOS, HttpStatus.OK);
        }
    }


    @GetMapping("search-employee")
    public ResponseEntity<List<Account>> searchMeetingRoomByName(@RequestParam(required = false) String keyWord) {
        List<Account> accounts = accountService.findEmployeeAccountByFullNameOrAccountCode(keyWord);
        return new ResponseEntity<>(accounts, HttpStatus.OK);
    }


    @GetMapping("employee-account/{id}")
    public ResponseEntity<Account> getEmployeeById(@PathVariable("id") long id) {
        Account account = accountService.getAccountById(id);
        if (account == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(account, HttpStatus.OK);
    }


    @PutMapping("employee-account-edit")
    public ResponseEntity<?> updateEmployee(@RequestBody CreateEmployeeAccount account) {
        Account account1;

        if (account.getPassword().isEmpty()) {
            account1 = new Account(account.getId(), true, account.getFullname(), account.getBirthday(), account.getIdCard(), account.getAddress(), account.getPhone(), account.getEmail(), account.getGender(), account.getImageUrl(), "local");
        } else {
            String passwordEncode = passwordEncoder.encode(account.getPassword());
            account1 = new Account(account.getId(), true, account.getFullname(), account.getBirthday(), account.getIdCard(), account.getAddress(), account.getPhone(), account.getEmail(), account.getGender(), account.getImageUrl(), passwordEncode, "local");
        }
        accountRepository.save(account1);
        accountRepository.createAccountRole(account.getId(), 3);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PostMapping(value = "employee-account-create")
    public ResponseEntity<?> createEmployee(@RequestBody CreateEmployeeAccount account) {
        String passwordEncode = passwordEncoder.encode(account.getPassword());
        Account account1 = new Account(passwordEncode, true, account.getFullname(), account.getBirthday(), account.getIdCard(), account.getAddress(), account.getPhone(), account.getEmail(), account.getGender(), account.getImageUrl(), "local");
        Account account2 = accountRepository.save(account1);
        accountRepository.createAccountRole(account2.getId(), 3);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @DeleteMapping(value = "employee-account-delete/{id}")
    public ResponseEntity<?> deleteByEmployeeId(@PathVariable Long id) {
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

    @PostMapping("/do-forget-password")
    public ResponseEntity<?> doResetPassword(@RequestBody ResetPassRequest resetPassRequest) {
        accountService.saveNewPassword(passwordEncoder.encode(resetPassRequest.getPassword()), resetPassRequest.getCode());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping(value = "/auth/update/{id}")
    public ResponseEntity<?> updateAccountForApp(@PathVariable("id") long id, @RequestBody UpdateAccountDTO accountUserDTO) {
        Account account = accountService.findAccountUpdateById(id);

        if (account == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            accountRepository.updateAccountForApp(
                    accountUserDTO.getAddress().trim(),
                    accountUserDTO.getBirthday(),
                    accountUserDTO.getFullname().trim(),
                    accountUserDTO.getGender().trim(),
                    accountUserDTO.getPhone().trim(),
                    id
            );
            return new ResponseEntity<>(account, HttpStatus.CREATED);
        }
    }

}


