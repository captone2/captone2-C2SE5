package com.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import org.hibernate.annotations.Type;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Boolean isEnabled;
    private String username;
    @Transient
    private String accountCode;
    private String password;
    private String fullname;
    private LocalDate birthday;
    private String idCard;
    private String address;
    private String phone;
    private String verificationCode;
    private String email;
    private String gender;
    private int totalPoint;
    private String imageUrl;
    private String provider;
    private LocalDateTime createAt;
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Comment> comments;

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public Boolean getEnabled() {
        return isEnabled;
    }

    public void setEnabled(Boolean enabled) {
        isEnabled = enabled;
    }

    @PrePersist
    public void prePersist() {
        createAt = LocalDateTime.now();
    }

    @ManyToMany
    @JsonBackReference
    @JoinTable(name = "account_role", joinColumns = @JoinColumn(name = "account_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAccountCode() {
        return accountCode;
    }

    public void setAccountCode(String accountCode) {
        this.accountCode = accountCode;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public int getTotalPoint() {
        return totalPoint;
    }

    public void setTotalPoint(int totalPoint) {
        this.totalPoint = totalPoint;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }

    public Account() {
    }

    public Account(long id, Boolean isEnabled, String fullname, LocalDate birthday, String idCard, String address, String phone, String email, String gender, String imageUrl, String password, String provider) {
        this.id = id;
        this.isEnabled = isEnabled;
        this.fullname = fullname;
        this.birthday = birthday;
        this.idCard = idCard;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.gender = gender;
        this.imageUrl = imageUrl;
        this.password = password;
        this.provider = provider;
    }

    public Account(long id, Boolean isEnabled, String fullname, LocalDate birthday, String idCard, String address, String phone, String email, String gender, String imageUrl, String provider) {
        this.id = id;
        this.isEnabled = isEnabled;
        this.fullname = fullname;
        this.birthday = birthday;
        this.idCard = idCard;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.gender = gender;
        this.imageUrl = imageUrl;
        this.provider = provider;
    }

    public Account(String password, Boolean isEnabled, String fullname, LocalDate birthday, String idCard, String address, String phone, String email, String gender, String imageUrl, String provider) {
        this.password = password;
        this.isEnabled = isEnabled;
        this.fullname = fullname;
        this.birthday = birthday;
        this.idCard = idCard;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.gender = gender;
        this.imageUrl = imageUrl;
        this.provider = provider;
    }


}

