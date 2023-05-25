package com.model.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
@Entity
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String description;
    private double price;
    private Boolean isEnabled;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Boolean getEnabled() {
        return isEnabled;
    }

    public void setEnabled(Boolean enabled) {
        isEnabled = enabled;
    }

    public Food(long id, String title, String description, double price, Boolean isEnabled) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.isEnabled = isEnabled;
    }

    public Food(String title, String description, double price, Boolean isEnabled) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.isEnabled = isEnabled;
    }

    public Food() {
    }
}
