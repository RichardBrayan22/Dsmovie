package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.repositories.GenreRepository;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repository;

    @Autowired
    private GenreRepository genreRepository;

    public MovieDTO findById(Long id) {
        Optional<Movie> obj = repository.findById(id);
        obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
        Movie entity = obj.get();
        return new MovieDTO(entity);
    }

    public List<ReviewDTO> findByMovieReviews(Long movieId) {
        Movie movie = repository.getOne(movieId);
        List<Review> list = repository.findByReviews(movie);
        return list.stream().map(x -> new ReviewDTO(x)).collect(Collectors.toList());
    }

    public Page<MovieDTO> findByGenre(Long genreId, Pageable pageable) {
        Genre genre = (genreId == 0) ? null : genreRepository.getOne(genreId);
        Page<Movie> page = repository.findByGenre(genre, pageable);
        return page.map(x -> new MovieDTO(x));
    }

}
