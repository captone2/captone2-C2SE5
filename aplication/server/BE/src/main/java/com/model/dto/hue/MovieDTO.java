package com.model.dto.hue;

import java.time.LocalDate;
import java.util.List;


public class MovieDTO {
    private long id;

    private String title;
    private LocalDate showingFrom;
    private LocalDate showingTo;
    private String cast;
    private String director;
    private LocalDate releaseDate;
    private String rated;
    private int runningTime;
    private String production;
    private String trailerUrl;
    private String content;
    private boolean is3D;
    private long accountId;

    private List<String> genres;
    private List<String> movieImages;
    private List<com.model.dto.hue.ShowTimesDTO> showtime;

//    private List<Comment> comments;

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public List<String> getMovieImages() {
        return movieImages;
    }

    public void setMovieImages(List<String> movieImages) {
        this.movieImages = movieImages;
    }

    public List<com.model.dto.hue.ShowTimesDTO> getShowtime() {
        return showtime;
    }

    public void setShowtime(List<com.model.dto.hue.ShowTimesDTO> showtime) {
        this.showtime = showtime;
    }

    public MovieDTO() {
    }

    public boolean isIs3D() {
        return is3D;
    }

    public void setIs3D(boolean is3D) {
        this.is3D = is3D;
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

    public LocalDate getShowingFrom() {
        return showingFrom;
    }

    public void setShowingFrom(LocalDate showingFrom) {
        this.showingFrom = showingFrom;
    }

    public LocalDate getShowingTo() {
        return showingTo;
    }

    public void setShowingTo(LocalDate showingTo) {
        this.showingTo = showingTo;
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

    public String getRated() {
        return rated;
    }

    public void setRated(String rated) {
        this.rated = rated;
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

    public long getAccountId() {
        return accountId;
    }

    public void setAccountId(long accountId) {
        this.accountId = accountId;
    }


}
