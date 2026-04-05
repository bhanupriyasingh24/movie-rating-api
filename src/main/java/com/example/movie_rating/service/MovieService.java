package com.example.movie_rating.service;

import com.example.movie_rating.model.Movie;
import com.example.movie_rating.model.MovieSearchResponse;
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

    // ORIGINAL: Exact search by title (using ?t=)
    public Movie searchMovie(String title) {
        String url = apiUrl + "?t=" + title + "&apikey=" + apiKey;
        return restTemplate.getForObject(url, Movie.class);
    }

    // NEW: Bulk search by partial title for the dropdown (using ?s=)
    public MovieSearchResponse searchMoviesBulk(String query) {
        String url = apiUrl + "?s=" + query + "&apikey=" + apiKey;
        return restTemplate.getForObject(url, MovieSearchResponse.class);
    }

    // NEW: Exact lookup by IMDB ID when a dropdown item is clicked (using ?i=)
    public Movie getMovieById(String imdbId) {
        String url = apiUrl + "?i=" + imdbId + "&apikey=" + apiKey;
        return restTemplate.getForObject(url, Movie.class);
    }
}
