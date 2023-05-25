package com.model.dto;

public class TicketFoodDTO {
    private long ticket;
    private long food;

    public long getTicket() {
        return ticket;
    }

    public void setTicket(long ticket) {
        this.ticket = ticket;
    }

    public long getFood() {
        return food;
    }

    public void setFood(long food) {
        this.food = food;
    }

    public TicketFoodDTO() {
    }

    public TicketFoodDTO(long ticket, long food) {
        this.ticket = ticket;
        this.food = food;
    }
}
