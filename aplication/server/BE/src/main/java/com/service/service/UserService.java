package com.service.service;

import com.dto.dto.LocalUser;
import com.dto.dto.SignUpRequest;
import com.exception.UserAlreadyExistAuthenticationException;
import com.model.entity.Account;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;

import java.util.Map;
import java.util.Optional;


public interface UserService {

	Account registerNewUser(SignUpRequest signUpRequest) throws UserAlreadyExistAuthenticationException;

	Account findUserByEmail(String email);

	Optional<Account> findUserById(Long id);

	LocalUser processUserRegistration(String registrationId, Map<String, Object> attributes, OidcIdToken idToken, OidcUserInfo userInfo);

    boolean checkEmail(String email);

	boolean checkPhone(String phone);

	boolean checkUsername(String username);

	Account findAccountByUsername(String username);
}
