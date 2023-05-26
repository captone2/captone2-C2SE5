package com.controller.controller;

import com.model.dto.dto.*;
import com.exception.UserAlreadyExistAuthenticationException;
import com.model.entity.Account;
import com.repository.AccountRepository;
import com.security.jwt.TokenProvider;
import com.service.AccountService;
import com.service.service.UserService;
import com.util.GeneralUtils;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import payload.request.ResetPassRequest;
import payload.request.VerifyRequest;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("**")
public class AuthController {

	@Autowired
    AuthenticationManager authenticationManager;

	@Autowired
	UserService userService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	AccountService accountService;

	@Autowired
	TokenProvider tokenProvider;

	@Autowired
	AccountRepository accountRepository;

	@GetMapping("/")
	public String test(){
		return"hello world";
	}

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		System.out.println(loginRequest.getEmail());
		System.out.println(loginRequest.getPassword());
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = tokenProvider.createToken(authentication);
		LocalUser localUser = (LocalUser) authentication.getPrincipal();
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, GeneralUtils.buildUserInfo(localUser)));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
		signUpRequest.setSocialProvider(SocialProvider.LOCAL);
		try {
			userService.registerNewUser(signUpRequest);
		} catch (UserAlreadyExistAuthenticationException e) {
			return new ResponseEntity<>(new ApiResponse(false, "Email Address already in use!"), HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok().body(new ApiResponse(true, "User registered successfully"));
	}

	@PostMapping("/check-email")
	public boolean checkEmail(@RequestBody String email){
		return userService.checkEmail(email);
	}
	@PostMapping("/check-cccd")
	public boolean checkCCCD(@RequestBody String cccd){
		return accountRepository.existsByIdCard(cccd);
	}
	@PostMapping("/check-phone")
	public boolean checkPhone(@RequestBody String phone){
		return userService.checkPhone(phone);
	}
	@PostMapping("/check-username")
	public boolean checkUsername(@RequestBody String username){
		return userService.checkUsername(username);
	}

    @GetMapping(value = "/findAccount")
    public ResponseEntity<?> findAccountByUser(@RequestParam String username) {
        Account account = userService.findAccountByUsername(username);
        if (account != null) {
            return ResponseEntity.ok(account);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


	@PostMapping("/reset-password")
	public ResponseEntity<?> forgotPassword(@RequestBody payload.request.LoginRequest loginRequest){
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


	@PostMapping("/verify-register")
	public ResponseEntity<?> verifyResgister(@RequestBody VerifyRequest code) {
		accountRepository.verifyRegister(code.getCode());
		return new ResponseEntity<>(HttpStatus.OK);
	}
}

