package com.model.dto.movie;

import javax.persistence.Column;
import java.time.LocalDate;
import java.util.List;


public class MovieDTO {
    private long id;
    private String title;
    private String cast;
    private String director;
    private LocalDate releaseDate;
    private int runningTime;
    private String production;
    private String trailerUrl;
    private String content;
    private List<Integer> genre;
    private String imgUrl;
    public MovieDTO() {
    }

    public MovieDTO(String title, String cast, String director, LocalDate releaseDate, int runningTime, String production, String trailerUrl, String content) {
        this.title = title;
        this.cast = cast;
        this.director = director;
        this.releaseDate = releaseDate;
        this.runningTime = runningTime;
        this.production = production;
        this.trailerUrl = trailerUrl;
        this.content = content;
    }

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

    public String getCast() {
        return cast;
    }

    public void setCast(String cast) {
        this.cast = cast;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public int getRunningTime() {
        return runningTime;
    }

    public void setRunningTime(int runningTime) {
        this.runningTime = runningTime;
    }

    public String getProduction() {
        return production;
    }

    public void setProduction(String production) {
        this.production = production;
    }

    public String getTrailerUrl() {
        return trailerUrl;
    }

    public void setTrailerUrl(String trailerUrl) {
        this.trailerUrl = trailerUrl;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<Integer> getGenre() {
        return genre;
    }

    public void setGenre(List<Integer> genre) {
        this.genre = genre;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }
}
