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
      const response = await axios.post('http://localhost:3000/auth/sign_in',
          { email: email, password: password });
console.log(response);

      // // ここでヘッダーから access-token、client、uid を取得
      // const accessToken = response.headers.get('access-token');
      // const client = response.headers.get('client');
      // const uid = response.headers.get('uid');

      // // 保存する場合は、ローカルストレージやステートに保存
      // localStorage.setItem('access-token', accessToken || '');
      // localStorage.setItem('client', client || '');
      // localStorage.setItem('uid', uid || '');

      // トップページへ遷移
      navigate('/');
    } catch (err: any) {
      alert('ログインに失敗しました');
    }
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
