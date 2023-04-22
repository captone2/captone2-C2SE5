package com.model.dto;

//TuHC
public class CommentDTO {
    private long id;
    private String content;
    private int seen;
    private int movie;
    private int account;

    public CommentDTO(long id, String content, int seen, int movie, int account) {
        this.id = id;
        this.content = content;
        this.seen = seen;
        this.movie = movie;
        this.account = account;
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

    public int isSeen() {
        return seen;
    }

    public void setSeen(int seen) {
        this.seen = seen;
    }

    public int getMovie() {
        return movie;
    }

    public void setMovie(int movie) {
        this.movie = movie;
    }

    public int getAccount() {
        return account;
    }

    public void setAccount(int account) {
        this.account = account;
    }

    @Override
    public String toString() {
        return "CommentDTO{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", seen=" + seen +
                ", movie=" + movie +
                ", account=" + account +
                '}';
    }
}
