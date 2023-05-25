import { useForm } from 'react-hook-form';
import Button from '../../../components/Button';
import { useState, useContext } from 'react';
import { AuthContext } from '../../../AuthContext';
import { getTokenData } from '../../../util/auth';
import { requestBackendLogin } from '../../../util/requests';
import { saveAuthData } from '../../../util/storage';
import { useHistory, useLocation } from 'react-router-dom';

import './styles.css';


type FormData = {
  username: string;
  password: string;
};

type LocatitonState = {
  from: string;
}

const Login = () => {


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { setAuthContextData } = useContext(AuthContext);

  const [hasError, setHasError] = useState(false);

  const location = useLocation<LocatitonState>();

  const { from } = location.state || { from:  {pathname: '/movies' } };
  
  const history = useHistory();


  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setHasError(false);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        })
        history.replace(from)
      })
      .catch((error) => {
        setHasError(true);
      });
  };

  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      {hasError && (
        <div className="alert alert-danger">
          Erro ao tentar efetuar o login
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('username', {
              required: 'Campo Obrigatorio',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
            type="text"
            className={`form-control base-input  ${
              errors.username ? 'is-invalid ' : ''
            }`}
            placeholder="Email"
            name="username"
          />
          <div className="invalid-feedback d-block">
            {errors.username?.message}
          </div>
        </div>
        <div className="mb-2">
          <input
            {...register('password', {
              required: 'Campo Obrigatorio',
            })}
            type="password"
            className={`form-control base-input ${
              errors.password ? 'is-invalid ' : ''
            }`}
            placeholder="Password"
            name="password"
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
        </div>
        <div className="login-submit">
          <Button text="Fazer login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
