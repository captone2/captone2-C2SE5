package com.model.dto;

import java.util.List;

public class BookingFoodDTO {

    private String id;
    private List<Integer> list1;
    private List<Integer> list2;

    public BookingFoodDTO() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Integer> getList1() {
        return list1;
    }

    public void setList1(List<Integer> list1) {
        this.list1 = list1;
    }

    public List<Integer> getList2() {
        return list2;
    }

    public void setList2(List<Integer> list2) {
        this.list2 = list2;
    }
}
