package com.model.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public interface ShowTimeDTO {
    long getId();
    String getTitle();
    String getScreenName();
    LocalDate getShowDay();
    LocalTime getShowTime();
    int getIs3D();
    double getPrice();

}
