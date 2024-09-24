import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FormData } from '../types/types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components"

const LoginForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    try {
      const response = await axios.post('http://localhost:3000/auth/sign_in', {
        email,
        password,
      });

      saveAuthHeaders(response.headers);
      navigate('/');
    } catch (err) {
      setError('ログインに失敗しました')
    }
  };

  const saveAuthHeaders = (headers: any) => {
    const accessToken = headers['access-token'] || '';
    const client = headers['client'] || '';
    const uid = headers['uid'] || '';

    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('client', client);
    localStorage.setItem('uid', uid);
  };

  return (
    <div>
      <h2>ログインフォーム</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledWrapper>
          <label>Email</label>
          <input
            type="email"
            {...register('email', { required: 'メールアドレスは必須です' })}
            placeholder='email'
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </StyledWrapper>
        <StyledWrapper>
          <label>Password</label>
          <input
            type="password"
            {...register('password', { required: 'パスワードは必須です' })}
            placeholder='password'
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </StyledWrapper>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

const StyledWrapper = styled.div`
  margin: 10px 0;
  label {
    margin: 0 10px;
  }
`

export default LoginForm;
