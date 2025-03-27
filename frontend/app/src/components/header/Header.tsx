import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import useAuthRedirect from '../../hooks/login/logout';
import { headers } from '../../api/client';
import { Button } from '@mui/material';
import { API_BASE_URL } from '../../constants';
import { User } from '../../types/types';

const Header = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState<User | null>(null);
  useAuthRedirect(); // ログアウト状態の時、トップへリダイレクトする

  useEffect(() => {
    const fetchLoginUser = async() => {
      try {
        const response = await axios.get(`${API_BASE_URL}users/me`, { headers });
        setLoginUser(response.data);
      } catch (error) {
        console.error('Error fetching User Data:', error);
      }
    }

    fetchLoginUser();
  }, [])

  const logout = async () => {
    await axios.delete('http://localhost:3000/auth/sign_out', { headers });
    navigate('/login');
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');

    // ヘッダーのログインユーザー名の削除
    setLoginUser(null)
  };

  return (
    <HeaderWrapper>
      <TextLinkWrapper to="/">
        <h1>Jupiter Map</h1>
      </TextLinkWrapper>
      <UserInfo>
        {loginUser && <span>ようこそ、{loginUser?.lastname} {loginUser?.firstname} さん</span>}
        {localStorage.getItem("access-token") &&
          <Button variant="outlined" className="logout-button" onClick={logout}>ログアウト</Button>}
      </UserInfo>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  background-color: #333;
  color: white;
`;

const TextLinkWrapper = styled(Link)`
  text-decoration: none;
  color: white;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 20px;

  span {
    font-size: 16px;
    font-weight: bold;
  }

  .logout-button {
    background-color: white;
    font-weight: bold;
  }
`;

export default Header;
