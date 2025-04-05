import { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { API_BASE_URL } from '../../constants';
import { loginUserState } from '../../atoms/user';
import { useRecoilState } from 'recoil';

const Header = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useRecoilState(loginUserState);

  useEffect(() => {
    const fetchLoginUser = async() => {
      try {
        const response = await axios.get(`${API_BASE_URL}users/me`, { withCredentials: true });
        setLoginUser(response.data.user);
      } catch (error) {
        console.error('Error fetching User Data:', error);
      }
    }

    fetchLoginUser();
  }, [loginUser, setLoginUser])

  const logout = async () => {
    await axios.delete('http://localhost:3000/auth/sign_out', { withCredentials: true });
    navigate('/login');

    // ヘッダーのログインユーザー名の削除
    setLoginUser({ id: null, lastname: "", firstname: "", signed_in: false })
  };

  return (
    <HeaderWrapper>
      <TextLinkWrapper>
        <h1>Jupiter Map</h1>
      </TextLinkWrapper>
      <UserInfo>
        {loginUser?.signed_in && <span>ようこそ、{loginUser?.lastname} {loginUser?.firstname} さん</span>}
        {loginUser?.signed_in &&
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

const TextLinkWrapper = styled.div`
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
