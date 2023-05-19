package com.model.dto.employeeAccount;

import com.model.entity.Role;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

public class CreateEmployeeAccount {
    private long id;
    private String fullname;
    private LocalDate birthday;
    private String idCard;
    private String address;
    private String phone;
    private String email;
    private String gender;
    private String imageUrl;
    private String password;
    public CreateEmployeeAccount() {
    }

    public CreateEmployeeAccount(long id, String fullname, LocalDate birthday, String idCard, String address, String phone, String email, String gender, String imageUrl) {
        this.id = id;
        this.fullname = fullname;
        this.birthday = birthday;
        this.idCard = idCard;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.gender = gender;
        this.imageUrl = imageUrl;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
