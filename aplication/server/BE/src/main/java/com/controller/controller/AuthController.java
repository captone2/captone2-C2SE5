package com.controller.controller;

import com.model.dto.dto.*;
import com.exception.UserAlreadyExistAuthenticationException;
import com.model.entity.Account;
import com.security.jwt.TokenProvider;
import com.service.service.UserService;
import com.util.GeneralUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("**")
public class AuthController {

	@Autowired
    AuthenticationManager authenticationManager;

	@Autowired
	UserService userService;

	@Autowired
	TokenProvider tokenProvider;

	@GetMapping("/")
	public String test(){
		return"hello world";
	}

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
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
//			log.error("Exception Ocurred", e);
			return new ResponseEntity<>(new ApiResponse(false, "Email Address already in use!"), HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok().body(new ApiResponse(true, "User registered successfully"));
	}

	@PostMapping("/check-email")
	public boolean checkEmail(@RequestBody String email){
		return userService.checkEmail(email);
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
}