import { Movie } from '../../../../types/movie';
import './styles.css';

type Props = {
  movie: Movie | undefined;
};

const MovieCardDetails = ({ movie }: Props) => {
  return (
    <div className="base-card movie-card-container">
      <div className='movie-card-details'>
      <div className="card-details-top-container">
        <img src={movie?.imgUrl} alt={movie?.title} />
      </div>
      <div className="card-details-bottom-container">
        <h5>{movie?.title}</h5>
        <span>{movie?.year}</span>
        <h6>{movie?.subTitle}</h6>
        <div className="card-details-synopsis">
          <p>{movie?.synopsis}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MovieCardDetails;
