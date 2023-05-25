package com.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
//@JsonIdentityInfo(generator= JSOGGenerator.class)
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String content;
    private Integer rate;
    private LocalDateTime createAt;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "movie_id", referencedColumnName = "id")
    private Movie movie;

    @PrePersist
    public void prePersist() {
        createAt = LocalDateTime.now();
    }

    @ManyToOne
//    @JsonBackReference
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account account;

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }
}
