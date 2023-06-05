import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from '../../../../types/genre';
import { useEffect, useState } from 'react';

import './styles.css';
import { requestBackend } from '../../../../util/requests';

export type MovieFilterData = {
  genre: Genre | null;
};

type Props = {
  onSubmitFilter: (data: MovieFilterData) => void;
};

const MovieFilter = ({ onSubmitFilter }: Props) => {
  const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

  const { handleSubmit, setValue, getValues, control } =
    useForm<MovieFilterData>();

  const onSubmit = (formData: MovieFilterData) => {
    onSubmitFilter(formData);
  };

  useEffect(() => {
    requestBackend({ url: '/genres', withCredentials: true }).then(
      (response) => {
        setSelectGenres(response.data);
      }
    );
  }, []);

  const handleChangeGenre = (value: Genre) => {
    setValue('genre', value);

    const obj: MovieFilterData = {
      genre: getValues('genre'),
    };

    onSubmitFilter(obj);
  };

  

  return (
    <div className="base-card movie-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="movie-filter-form">
        <div className="movie-filter-genre-container">
          <Controller
            name="genre"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={selectGenres}
                classNamePrefix="genre-filter-select"
                placeholder="Gênero"
                isClearable
                isSearchable={false}
                onChange={(value) => handleChangeGenre(value as Genre)}
                getOptionLabel={(genre: Genre) => genre.name}
                getOptionValue={(genre: Genre) => String(genre.id)}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default MovieFilter;
