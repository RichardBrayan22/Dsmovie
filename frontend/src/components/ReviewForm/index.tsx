import { useForm } from 'react-hook-form';
import { AxiosRequestConfig } from 'axios';
import Button from '../Button';

import './styles.css';
import { requestBackend } from '../../util/requests';
import { Review } from '../../types/review';
import { toast } from 'react-toastify';

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
        toast.success('Avaliação enviada com sucesso', {
          theme: 'colored',
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Erro ao enviar avaliação', {
          theme: 'colored',
        });
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
          className={`form-control base-input ${
            errors.text ? 'is-invalid ' : ''
          }`}
          placeholder="Deixe sua avaliação aqui"
          name="text"
        />

        <div className="btn-container-review">
          <div className="center-btn">
            <Button text="Salvar Avaliação" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
