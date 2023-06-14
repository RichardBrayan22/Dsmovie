import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { Review } from '../../../types/review';
import { requestBackend } from '../../../util/requests';

import ReviewForm from '../../../components/ReviewForm';
import ReviewListing from '../../../components/ReviewListing';
import './styles.css';
import { hasAnyRole } from '../../../util/auth';
import MovieCardDetails from './MovieCardDetails';
import { Movie } from '../../../types/movie';

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(config).then((reponse) => {
      setReviews(reponse.data);
    });
  }, [movieId]);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}`,
      withCredentials: true,
    };

    requestBackend(config).then((reponse) => {
      setMovie(reponse.data);
    });
  }, [movieId]);


  const handleInsertReview = (review: Review) => {

    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  }

  return (
    <>
    <div className='container-details'>

      <MovieCardDetails movie={movie}/>

      {hasAnyRole(['ROLE_MEMBER']) &&(
         <ReviewForm onInsertReview={handleInsertReview} movieId={movieId} />
      )} 
      
      {reviews.length !== 0 && <ReviewListing reviews={reviews} />}
      
    </div>
      
    </>
  );
};

export default MovieDetails;
