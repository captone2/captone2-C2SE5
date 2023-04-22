package com.dto.dto;


import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class SignUpRequest {

	private Long userID;

	@NotEmpty
	private String fullName;

	@NotEmpty
	private String email;

	@NotEmpty
	private String phone;

	private String address;

	@NotEmpty
	private String idCard;

	@NotEmpty
	private String username;

	@NotEmpty
	private String birthday;

	private String gender;

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	private SocialProvider socialProvider;

	@Size(min = 6, message = "{Size.userDto.password}")
	private String password;

	@NotEmpty
	private String matchingPassword;

	public Long getUserID() {
		return userID;
	}

	public void setUserID(Long userID) {
		this.userID = userID;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public SocialProvider getSocialProvider() {
		return socialProvider;
	}

	public void setSocialProvider(SocialProvider socialProvider) {
		this.socialProvider = socialProvider;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMatchingPassword() {
		return matchingPassword;
	}

	public void setMatchingPassword(String matchingPassword) {
		this.matchingPassword = matchingPassword;
	}

	public SignUpRequest(String gender, @NotEmpty String fullName, @NotEmpty String email, @NotEmpty String phone, String address, @NotEmpty String idCard, @NotEmpty String username, @Size(min = 6, message = "{Size.userDto.password}") String password, @NotEmpty String birthday, SocialProvider socialProvider) {
		this.gender = gender;
		this.fullName = fullName;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.idCard = idCard;
		this.username = username;
		this.password = password;
		this.birthday = birthday;
		this.socialProvider = socialProvider;
	}

	public static Builder getBuilder() {
		return new Builder();
	}

	public static class Builder {

		private String gender;
		private String fullName;
		private String email;
		private String phone;
		private String address;
		private String idCard;
		private String username;
		private String password;
		private String birthday;
		private SocialProvider socialProvider;

		public Builder addGender(final String gender) {
			this.gender = gender;
			return this;
		}

		public Builder addFullName(final String fullName) {
			this.fullName = fullName;
			return this;
		}

		public Builder addEmail(final String email) {
			this.email = email;
			return this;
		}
		public Builder addPhone(final String phone) {
			this.phone = phone;
			return this;
		}
		public Builder addAddress(final String address) {
			this.address = address;
			return this;
		}
		public Builder addIdCard(final String idCard) {
			this.idCard = idCard;
			return this;
		}
		public Builder addUsername(final String username) {
			this.username = username;
			return this;
		}

		public Builder addPassword(final String password) {
			this.password = password;
			return this;
		}
		public Builder addBirthday(final String birthday) {
			this.birthday = birthday;
			return this;
		}

		public Builder addSocialProvider(final SocialProvider socialProvider) {
			this.socialProvider = socialProvider;
			return this;
		}

		public SignUpRequest build() {
			return new SignUpRequest(gender,fullName, email,phone,address,idCard,username, password,birthday, socialProvider);
		}
	}
}
