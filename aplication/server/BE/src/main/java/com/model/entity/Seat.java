package com.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean vip;
    private String name;
    private Boolean isEnabled;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "screen_id", referencedColumnName = "id")
    private Screen screen;

    @ManyToMany
    @JsonBackReference
    @JoinTable(name = "booking_seat", joinColumns = @JoinColumn(name = "seat_id"), inverseJoinColumns = @JoinColumn(name = "booking_id"))
    private Set<Booking> bookings;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isVip() {
        return vip;
    }

    public void setVip(boolean vip) {
        this.vip = vip;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public Screen getScreen() {
        return screen;
    }

    public void setScreen(Screen screen) {
        this.screen = screen;
    }

    public Set<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(Set<Booking> bookings) {
        this.bookings = bookings;
    }

    public Boolean getEnabled() {
        return isEnabled;
    }

    public void setEnabled(Boolean enabled) {
        isEnabled = enabled;
    }
}
