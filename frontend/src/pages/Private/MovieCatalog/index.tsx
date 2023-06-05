import { AxiosRequestConfig } from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../../../components/MovieCard';
import Pagination from '../../../components/Pagination';
import { Movie } from '../../../types/movie';
import { SpringPage } from '../../../types/vendor/spring';
import { requestBackend } from '../../../util/requests';
import './styles.css';
import MovieFilter, { MovieFilterData } from './MovieFilter';

type ControlComponentsData = {
  activePage: number;
  filterData: MovieFilterData;
};

const MovieCatalog = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { genre: null },
    });

  const handleSubmitFilter = (filterData: MovieFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: filterData });
  };

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };


  const getMovies = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        genreId: controlComponentsData.filterData.genre?.id,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <>
      <div className=" container my-4 movie-container">
        <MovieFilter onSubmitFilter={handleSubmitFilter} />
        <div className="row">
          {page?.content.map((movie) => {
            return (
              <div className="col-sm-6 col-xl-3" key={movie.id}>
                <Link to={'movies/' + movie.id}>
                  <MovieCard movie={movie} />
                </Link>
              </div>
            );
          })}
        </div>
        <div className="row">
          <Pagination
            pageCount={page ? page.totalPages : 0}
            range={2}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default MovieCatalog;
