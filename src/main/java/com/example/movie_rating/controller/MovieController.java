package com.example.movie_rating.controller;

import com.example.movie_rating.model.Movie;
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

    @GetMapping
    public Movie getMovie(@RequestParam String search) {
        // Tells the Service worker to find the movie and return it
        return movieService.searchMovie(search);
    }
}
