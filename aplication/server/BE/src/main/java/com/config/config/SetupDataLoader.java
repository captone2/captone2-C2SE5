package com.config.config;

import com.model.dto.dto.SocialProvider;
import com.model.entity.Account;
import com.model.entity.Role;
import com.repository.AccountRepository;
import com.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Component
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

	private boolean alreadySetup = false;

	@Autowired
	private AccountRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	@Transactional
	public void onApplicationEvent(final ContextRefreshedEvent event) {
		if (alreadySetup) {
			return;
		}
		// Create initial roles
		Role userRole = createRoleIfNotFound(Role.ROLE_USER);
		Role adminRole = createRoleIfNotFound(Role.ROLE_ADMIN);
		Role modRole = createRoleIfNotFound(Role.ROLE_EMPLOYEE);
		Set<Role> roleSet = new HashSet<>();
//        Set.of(userRole, adminRole, modRole)
		roleSet.add(userRole);
		roleSet.add(adminRole);
		roleSet.add(modRole);
		createUserIfNotFound("admin@gmail.com", roleSet);
		alreadySetup = true;
	}

	@Transactional
	Account createUserIfNotFound(final String email, Set<Role> roles) {
		Account user = userRepository.findByEmail(email);
		if (user == null) {
			user = new Account();
			user.setFullname("Admin");
			user.setEmail(email);
			user.setPassword(passwordEncoder.encode("admin@"));
			user.setRoles(roles);
			user.setProvider(SocialProvider.LOCAL.getProviderType());
			user.setEnabled(false);
//			Date now = Calendar.getInstance().getTime();
//			user.setCreatedDate(now);
//			user.setModifiedDate(now);
			user = userRepository.save(user);
		}
		return user;
	}

	@Transactional
	Role createRoleIfNotFound(final String name) {
		Role role = roleRepository.findByName(name);
		if (role == null) {
			role = roleRepository.save(new Role(name));
		}
		return role;
	}
}