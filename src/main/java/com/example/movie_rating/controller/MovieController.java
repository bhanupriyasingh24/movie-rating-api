package com.example.movie_rating.controller;

import com.example.movie_rating.model.Movie;
import com.example.movie_rating.model.MovieSearchResponse;
import com.example.movie_rating.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    // ORIGINAL: Retained for backwards compatibility if needed
    @GetMapping
    public Movie getMovie(@RequestParam String search) {
        return movieService.searchMovie(search);
    }

    // NEW: Returns the array of suggestions for the dropdown
    @GetMapping("/search")
    public MovieSearchResponse searchMovies(@RequestParam String query) {
        return movieService.searchMoviesBulk(query);
    }

    // NEW: Returns the full movie details by exact IMDB ID
    @GetMapping("/details")
    public Movie getMovieDetails(@RequestParam String id) {
        return movieService.getMovieById(id);
    }
}
