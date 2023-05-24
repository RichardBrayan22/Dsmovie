import { useForm } from 'react-hook-form';

import Button from '../../../components/Button';
import './styles.css';

type FormData = {
    username: string;
    password: string;
  };

const Login = () => {

    const { register, formState: { errors } } = useForm<FormData>();

    return (
        <div className="base-card login-card">
      <h1>LOGIN</h1>
      <form>
        <div className="mb-4">
          <input
            {...register('username',{
              required: 'Campo Obrigatorio',
              pattern : {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido'
              }
            })}
            type="text"
            className={`form-control base-input  ${errors.username ? 'is-invalid ' : ''}`}
            placeholder="Email"
            name="username"
          />
          <div className='invalid-feedback d-block'>{errors.username?.message}</div>
        </div>
        <div className="mb-2">
          <input
             {...register('password',{
              required: 'Campo Obrigatorio'
            })}
            type="password"
            className={`form-control base-input ${errors.password ? 'is-invalid ' : ''}`}
            placeholder="Password"
            name="password"
          />
           <div className='invalid-feedback d-block'>{errors.password?.message}</div>
        </div>
        <div className="login-submit">
          <Button text="Fazer login" />
        </div>
      </form>
    </div>
    );
}

export default Login