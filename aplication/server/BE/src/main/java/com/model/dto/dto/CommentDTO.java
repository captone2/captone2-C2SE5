package com.model.dto.dto;

public class CommentDTO {
    private long id;
    private long vote;
    private double rate;

    public CommentDTO(long id, long vote, double rate) {
        this.id = id;
        this.vote = vote;
        this.rate = rate;
    }

    public CommentDTO() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getVote() {
        return vote;
    }

    public void setVote(long vote) {
        this.vote = vote;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }
    // Getters và Setters
}
