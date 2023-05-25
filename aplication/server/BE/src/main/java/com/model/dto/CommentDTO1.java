package com.model.dto;

public class CommentDTO1 {
    private int id;
    private String content;
    private int  rate;
    private int accountId;
    private int movieId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public CommentDTO1() {
    }

    public CommentDTO1(int id, String content, int rate, int accountId, int movieId) {
        this.id = id;
        this.content = content;
        this.rate = rate;
        this.accountId = accountId;
        this.movieId = movieId;
    }

    public CommentDTO1(String content, int rate, int accountId, int movieId) {
        this.content = content;
        this.rate = rate;
        this.accountId = accountId;
        this.movieId = movieId;
    }
}
