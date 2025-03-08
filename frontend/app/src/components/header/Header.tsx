import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthRedirect from '../../hooks/login/logout';

type AuthParams = {
  accessToken: string | null;
  client: string | null;
  uid: string | null;
};

const Header = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<AuthParams>({
    accessToken: null,
    client: null,
    uid: null
  });

  useAuthRedirect(); // ログアウト状態の時、トップへリダイレクトする

  useEffect(() => {
    const requireLoginParams: AuthParams = {
      accessToken: localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid')
    };
    setParams(requireLoginParams);
  }, []);

  const logout = async () => {
    const headers = {
      "access-token": localStorage.getItem("access-token"),
      "client": localStorage.getItem("client"),
      "uid": localStorage.getItem("uid"),
    };

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
      {localStorage.getItem("access-token") && <button onClick={logout}>ログアウト</button>}
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

export default Header;
