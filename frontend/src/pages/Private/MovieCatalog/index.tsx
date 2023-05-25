import { Link } from 'react-router-dom';
import './styles.css';

const MovieCatalog = () => {
 

  return (
    <div className="catalog-container">
      <h1>Tela listagem de filmes</h1>
      <div className="movies-list-container">
            <Link to={'movies/1'} key={1} >Acessar /movies/1</Link>
            <Link to={'movies/2'} key={2} >Acessar /movies/2</Link>
      </div>
    </div>
  );
};

export default MovieCatalog;
