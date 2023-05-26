import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { Review } from '../../../types/review';
import { requestBackend } from '../../../util/requests';

import ReviewForm from '../../../components/ReviewForm';
import ReviewListing from '../../../components/ReviewListing';
import './styles.css';
import { hasAnyRole } from '../../../util/auth';

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();

  const [reviews, setReviews] = useState<Review[]>([]);

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


  const handleInsertReview = (review: Review) => {

    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  }

  return (
    <>
    <div className='container-details'>
      <h1 className='mb-4 mt-2'>{`Tela detalhe do filme id:${movieId}`}</h1>

      {hasAnyRole(['ROLE_MEMBER']) &&(
         <ReviewForm onInsertReview={handleInsertReview} movieId={movieId} />
      )} 
      
      <ReviewListing reviews={reviews} />
    </div>
      
    </>
  );
};

export default MovieDetails;
