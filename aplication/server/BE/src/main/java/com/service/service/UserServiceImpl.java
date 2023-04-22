package com.service.service;

import com.dto.dto.LocalUser;
import com.dto.dto.SignUpRequest;
import com.dto.dto.SocialProvider;
import com.exception.OAuth2AuthenticationProcessingException;
import com.exception.UserAlreadyExistAuthenticationException;
import com.model.entity.Account;
import com.model.entity.Role;
import com.repository.AccountRepository;
import com.repository.RoleRepository;
import com.security.oauth2.user.OAuth2UserInfo;
import com.security.oauth2.user.OAuth2UserInfoFactory;
import com.util.GeneralUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;


@Service
public class UserServiceImpl implements com.service.service.UserService {

	@Autowired
	private AccountRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	@Transactional(value = "transactionManager")
	public Account registerNewUser(final SignUpRequest signUpRequest) throws UserAlreadyExistAuthenticationException {
		if (signUpRequest.getUserID() != null && userRepository.existsById(signUpRequest.getUserID())) {
			throw new UserAlreadyExistAuthenticationException("User with User id " + signUpRequest.getUserID() + " already exist");
		} else if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			throw new UserAlreadyExistAuthenticationException("User with email id " + signUpRequest.getEmail() + " already exist");
		}
		Account user = buildUser(signUpRequest);
//		Date now = Calendar.getInstance().getTime();
//		user.setCreatedDate(now);
//		user.setModifiedDate(now);
		user = userRepository.save(user);
		System.out.println("register");
		userRepository.flush();
		return user;
	}

	private Account buildUser(final SignUpRequest formDTO) {
		Account user = new Account();
		user.setFullname(formDTO.getFullName());
		user.setEmail(formDTO.getEmail());
		user.setPhone(formDTO.getPhone());
		user.setAddress(formDTO.getAddress());
		user.setIdCard(formDTO.getIdCard());
		user.setUsername(formDTO.getUsername());
		user.setPassword(passwordEncoder.encode(formDTO.getPassword()));
		LocalDate birth;
		if (formDTO.getBirthday()==null){
			birth = null;
		}else {
			birth = LocalDate.parse(formDTO.getBirthday(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		}
		user.setBirthday(birth);
		user.setGender(formDTO.getGender());
		final HashSet<Role> roles = new HashSet<Role>();
		roles.add(roleRepository.findByName(Role.ROLE_USER));
		user.setRoles(roles);
		user.setProvider(formDTO.getSocialProvider().getProviderType());
		user.setEnable(true);
//		user.setProviderUserId(formDTO.getProviderUserId());
		return user;
	}

	@Override
	public Account findUserByEmail(final String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	@Transactional
	public LocalUser processUserRegistration(String registrationId, Map<String, Object> attributes, OidcIdToken idToken, OidcUserInfo userInfo) {
		OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId, attributes);
		if (StringUtils.isEmpty(oAuth2UserInfo.getName())) {
			throw new OAuth2AuthenticationProcessingException("Name not found from OAuth2 provider");
		} else if (StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
			throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
		}
		SignUpRequest userDetails = toUserRegistrationObject(registrationId, oAuth2UserInfo);
		Account user = findUserByEmail(oAuth2UserInfo.getEmail());
		if (user != null) {
			if (!user.getProvider().equals(registrationId) && !user.getProvider().equals(SocialProvider.LOCAL.getProviderType())) {
				throw new OAuth2AuthenticationProcessingException(
						"Looks like you're signed up with " + user.getProvider() + " account. Please use your " + user.getProvider() + " account to login.");
			}
			user = updateExistingUser(user, oAuth2UserInfo);
		} else {
			user = registerNewUser(userDetails);
		}

		return LocalUser.create(user, attributes, idToken, userInfo);
	}

	@Override
	public boolean checkEmail(String email) {
		return userRepository.existsByEmail(email);
	}

	@Override
	public boolean checkPhone(String phone) {
		return userRepository.existsByPhone(phone);
	}

	@Override
	public boolean checkUsername(String username) {
		return userRepository.existsByUsername(username);
	}

	@Override
	public Account findAccountByUsername(String username) {
		return userRepository.findAccountByUsername(username);
	}

	private Account updateExistingUser(Account existingUser, OAuth2UserInfo oAuth2UserInfo) {
		existingUser.setFullname(oAuth2UserInfo.getName());
		return userRepository.save(existingUser);
	}

	private SignUpRequest toUserRegistrationObject(String registrationId, OAuth2UserInfo oAuth2UserInfo) {
		return SignUpRequest.getBuilder().addFullName(oAuth2UserInfo.getName()).addEmail(oAuth2UserInfo.getEmail())
				.addSocialProvider(GeneralUtils.toSocialProvider(registrationId)).addPassword("changeit").build();
	}

	@Override
	public Optional<Account> findUserById(Long id) {
		return userRepository.findById(id);
	}
}
