package com.devsuperior.movieflix.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.dto.UserDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository repository;

    @Autowired
    private AuthService authService;

    @Autowired
    private MovieRepository movieRepository;

    public ReviewDTO insert(ReviewDTO dto) {
        dto.setId(null);
        ModelMapper mapper = new ModelMapper();
        Movie movie = movieRepository.getOne(dto.getMovieId());
        User user = authService.authenticated();
        Review entity = mapper.map(dto, Review.class);
        entity.setMovie(movie);
        entity.setUser(user);
        entity = repository.save(entity);
        UserDTO userDTO = mapper.map(user, UserDTO.class);
        dto.setId(entity.getId());
        dto.setUser(userDTO);
        return dto;
    }

}