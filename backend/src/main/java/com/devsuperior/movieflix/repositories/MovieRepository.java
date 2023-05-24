package com.devsuperior.movieflix.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query("SELECT DISTINCT obj FROM Movie obj INNER JOIN obj.genre gen "
            + "WHERE :genre IS NULL OR :genre IN gen "
            + "ORDER BY obj.title ASC")
    Page<Movie> findByGenre(Genre genre, Pageable pageable);

    @Query("SELECT obj FROM Review obj INNER JOIN obj.movie mov "
            + "WHERE :movie IN mov")
    List<Review> findByReviews(Movie movie);

}
