package com.example.movie_rating.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class MovieSearchResponse {
    @JsonProperty("Search")
    private List<MovieSearchResult> search;
    
    @JsonProperty("totalResults")
    private String totalResults;
    
    @JsonProperty("Response")
    private String response;

    public List<MovieSearchResult> getSearch() { return search; }
    public void setSearch(List<MovieSearchResult> search) { this.search = search; }
    
    public String getTotalResults() { return totalResults; }
    public void setTotalResults(String totalResults) { this.totalResults = totalResults; }
    
    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }
}
