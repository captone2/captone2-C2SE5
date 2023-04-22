package com.model.dto;

import java.time.LocalDate;

//TuHC
public interface TopFiveMovieDTO {
    long getId();

    String getTitle();

    LocalDate getShowingFrom();

    LocalDate getShowingTo();

    String getCast();

    String getDirector();

    LocalDate getReleaseDate();

    String getRated();

    int getRunningTime();

    String getProduction();

    String getTrailerUrl();

    String getContent();

    int isIs3D();

    long getAccountId();

    int getViewer();

}
