
import { Movie } from '../../types/movie'
import './styles.css'

type Props = {
    movie: Movie
}

const MovieCard = ({movie}: Props) => {
   return(
    <div className="base-card movie-card">
    <div className="card-top-container">
        <img src={movie.imgUrl} alt={movie.title} />
    </div>
    <div className="card-bottom-container">
        <h5>{movie.title}</h5>
       <span>{movie.year}</span>
       <h6>{movie.subTitle}</h6>
    </div>
</div>
   )
}

export default MovieCard