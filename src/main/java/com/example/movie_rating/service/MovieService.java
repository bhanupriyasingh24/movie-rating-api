package com.example.movie_rating.service;

import com.example.movie_rating.model.Movie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MovieService {

    @Value("${omdb.api.key}")
    private String apiKey;

    @Value("${omdb.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public MovieService() {
        this.restTemplate = new RestTemplate();
    }

    public Movie searchMovie(String title) {
        // Build the URL to call the public OMDB API
        String url = apiUrl + "?t=" + title + "&apikey=" + apiKey;
        
        // Make the HTTP request and convert the JSON response to a Movie object
        return restTemplate.getForObject(url, Movie.class);
    }
}
