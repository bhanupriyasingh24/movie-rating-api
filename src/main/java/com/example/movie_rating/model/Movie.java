package com.example.movie_rating.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Movie {
    @JsonProperty("Title")
    private String title;
    
    @JsonProperty("Year")
    private String year;
    
    @JsonProperty("Director")
    private String director;
    
    @JsonProperty("imdbRating")
    private String imdbRating;
    
    @JsonProperty("Poster")
    private String poster;

    // Getters
    public String getTitle() { return title; }
    public String getYear() { return year; }
    public String getDirector() { return director; }
    public String getImdbRating() { return imdbRating; }
    public String getPoster() { return poster; }

    // Setters
    public void setTitle(String title) { this.title = title; }
    public void setYear(String year) { this.year = year; }
    public void setDirector(String director) { this.director = director; }
    public void setImdbRating(String imdbRating) { this.imdbRating = imdbRating; }
    public void setPoster(String poster) { this.poster = poster; }
}
