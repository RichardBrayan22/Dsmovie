import { useForm } from 'react-hook-form';
import { AxiosRequestConfig } from 'axios';
import Button from '../Button';

import './styles.css';
import { requestBackend } from '../../util/requests';
import { Review } from '../../types/review';

type FormData = {
  movieId: number;
  text: string;
};

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      data: formData,
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        setValue('text', '');
        onInsertReview(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="base-card login-card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('text', {
            required: 'Campo Obrigatorio',
          })}
          type="text"
          className={`form-control base-input ${errors.text ? 'is-invalid ' : ''}`}
          placeholder="Deixe sua avaliação aqui"
          name="text"
        />

        <Button text="Salvar Avaliação" />
      </form>
    </div>
  );
};

export default ReviewForm;
