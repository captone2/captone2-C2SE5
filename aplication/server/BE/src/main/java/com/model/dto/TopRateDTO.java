package com.model.dto;

public class TopRateDTO {
    private String title;
    private long vote;
    private  double rate;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public TopRateDTO() {
    }

    public TopRateDTO(String title, long vote, double rate) {
        this.title = title;
        this.vote = vote;
        this.rate = rate;
    }
}
