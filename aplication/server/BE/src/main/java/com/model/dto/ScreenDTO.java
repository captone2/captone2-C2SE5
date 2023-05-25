package com.model.dto;

public class ScreenDTO {
    private String name;
    private int totalSeat;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getTotalSeat() {
        return totalSeat;
    }

    public void setTotalSeat(int totalSeat) {
        this.totalSeat = totalSeat;
    }

    public ScreenDTO() {
    }

    public ScreenDTO(String name, int totalSeat) {
        this.name = name;
        this.totalSeat = totalSeat;
    }
}
