package com.example.movie_rating.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MovieSearchResult {
    @JsonProperty("Title")
    private String title;
    
    @JsonProperty("Year")
    private String year;
    
    @JsonProperty("imdbID")
    private String imdbId;
    
    @JsonProperty("Type")
    private String type;
    
    @JsonProperty("Poster")
    private String poster;

    // Getters
    public String getTitle() { return title; }
    public String getYear() { return year; }
    public String getImdbId() { return imdbId; }
    public String getType() { return type; }
    public String getPoster() { return poster; }

    // Setters
    public void setTitle(String title) { this.title = title; }
    public void setYear(String year) { this.year = year; }
    public void setImdbId(String imdbId) { this.imdbId = imdbId; }
    public void setType(String type) { this.type = type; }
    public void setPoster(String poster) { this.poster = poster; }
}
