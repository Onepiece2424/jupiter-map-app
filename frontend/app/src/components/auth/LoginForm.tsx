import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FormData } from '../../types/types';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../constants';
import { loginUserState } from '../../atoms/user';
import { useRecoilState } from 'recoil';
import { authState } from '../../atoms/auth';
import styled from "styled-components"

const LoginForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const [, setLoginUser] = useRecoilState(loginUserState);
  const [, setIsAuthenticated] = useRecoilState(authState);

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    try {
      const response = await axios.post(`${API_BASE_URL}auth/sign_in`,
        { email, password },
        { withCredentials: true });

      setLoginUser(response.data.user)
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      setError('ログインに失敗しました')
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        <h2>ログイン</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledWrapper>
            <label>Email</label>
            <StyledInput
              type="email"
              {...register('email', { required: 'メールアドレスは必須です' })}
              placeholder="email"
            />
            {errors.email && <StyledError>{errors.email.message}</StyledError>}
          </StyledWrapper>
          <StyledWrapper>
            <label>Password</label>
            <StyledInput
              type="password"
              {...register('password', { required: 'パスワードは必須です' })}
              placeholder="password"
            />
            {errors.password && <StyledError>{errors.password.message}</StyledError>}
          </StyledWrapper>
          {error && <StyledError>{error}</StyledError>}
          <StyledButton type="submit">ログイン</StyledButton>
        </form>
        <div className='sign-up-form'>
          <Link to='/sign_up'>ユーザー新規登録</Link>
        </div>
      </StyledCard>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  background: linear-gradient(to right, #74ebd5, #acb6e5);
`;

const StyledCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 320px;

  .sign-up-form {
    margin: 10px 0;
  }
`;

const StyledWrapper = styled.div`
  margin: 15px 0;
  text-align: left;
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
`;

const StyledInput = styled.input`
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  transition: 0.3s;
  &:focus {
    border-color: #74ebd5;
    outline: none;
    box-shadow: 0 0 5px rgba(116, 235, 213, 0.5);
  }
`;

const StyledError = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #74ebd5;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #5ac0b1;
  }
`;

export default LoginForm;
