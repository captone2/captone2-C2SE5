package com.model.dto;

public class GenreDTO {
    private String name;
    private Long total;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public GenreDTO() {
    }

    public GenreDTO(String name, Long total) {
        this.name = name;
        this.total = total;
    }


}
