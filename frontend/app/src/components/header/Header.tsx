import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthRedirect from '../../hooks/login/logout';
import { headers } from '../../api/client';
import { Button } from '@mui/material';

const Header = () => {
  const navigate = useNavigate();
  useAuthRedirect(); // ログアウト状態の時、トップへリダイレクトする

  const logout = async () => {
    await axios.delete('http://localhost:3000/auth/sign_out', { headers }
    ).then(() => {
      navigate('/login')
    });
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
  };

  return (
    <HeaderWrapper>
      <h1>Jupiter Map</h1>
      {localStorage.getItem("access-token") &&
        <Button variant="outlined" className="logout-button" onClick={logout}>ログアウト</Button>}
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

  .logout-button {
    margin: 0 20px;
    background-color: white;
    font-weight: bold;
  }
`;

export default Header;
