import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { suggestionsUsersListState } from '../../atoms/suggestionsUsers';
import { API_BASE_URL } from '../../constants';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FriendRequest = () => {
  const [suggestionsUsers, setSuggestionsUsers] = useRecoilState(suggestionsUsersListState);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}users/suggestions`, { withCredentials: true });
        setSuggestionsUsers(response.data);
      } catch (error) {
        console.log("友達候補のデータを取得できませんでした");
      }
    };

    fetchFriends();
  }, [setSuggestionsUsers]);

  const handleRequest = async (user: any) => {
    const params = { user: user };
    await axios.post(`${API_BASE_URL}friend_requests`, params, { withCredentials: true });
  };

  return (
    <Container>
      <TitleContainer>
        <Title>友達申請</Title>
        <FriendsListLink to="/friends">友達一覧</FriendsListLink>
      </TitleContainer>
      <UserList>
        {suggestionsUsers.map((user) => (
          <UserCard key={user.id}>
            <UserInfo>
              <UserName>{user.firstname} {user.lastname}</UserName>
              <UserDetails>ID: {user.id}</UserDetails>
              <UserDetails>年齢: {user.age}</UserDetails>
              <UserDetails>性別: {user.gender}</UserDetails>
              <UserDetails>Eメール: {user.email}</UserDetails>
            </UserInfo>
            <ActionButton onClick={() => handleRequest(user)}>申請する</ActionButton>
          </UserCard>
        ))}
      </UserList>
    </Container>
  );
};

export default FriendRequest;

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
`;

const FriendsListLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const UserCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const UserDetails = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #666;
`;

const ActionButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;
