package com.model.entity;

import org.hibernate.annotations.Type;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
//@JsonIdentityInfo(generator= JSOGGenerator.class)
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;
    private String cast;
    private String director;
    private LocalDate releaseDate;
    private int runningTime;
    private String production;
    private String trailerUrl;

    private LocalDate createAt;

    @Column(columnDefinition="LONGTEXT")
    private String content;

    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean is3D;


    @ManyToMany(mappedBy = "movies")
    private Set<Genre> genres;


    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<Comment> comments;


    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<MovieImage> movieImages;

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

    public boolean isIs3D() {
        return is3D;
    }

    public void setIs3D(boolean is3D) {
        this.is3D = is3D;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<MovieImage> getMovieImages() {
        return movieImages;
    }

    public void setMovieImages(List<MovieImage> movieImages) {
        this.movieImages = movieImages;
    }

    public LocalDate getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDate createAt) {
        this.createAt = createAt;
    }

    public Movie() {
    }

    public Movie(String title, String cast, String director, LocalDate releaseDate, int runningTime, String production, String trailerUrl, String content) {
        this.title = title;
        this.cast = cast;
        this.director = director;
        this.releaseDate = releaseDate;
        this.runningTime = runningTime;
        this.production = production;
        this.trailerUrl = trailerUrl;
        this.content = content;
    }
}
