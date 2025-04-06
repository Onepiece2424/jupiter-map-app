import { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { useRecoilState } from "recoil";
import { friendListState } from "../../atoms/friend";
import Friend from "./Friend";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FriendsList = () => {
  const [friends, setFriends] = useRecoilState(friendListState);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}friends`, { withCredentials: true });
        setFriends(response.data);
      } catch (error) {
        console.log("友達データを取得できませんでした");
      }
    };

    fetchFriends();
  }, [setFriends]);

  return (
    <Container>
      <Header>
        <Title>友達一覧</Title>
        <LinkContainer>
          <StyledLink to="/friends/notifications">友達通知</StyledLink>
          <StyledLink to="/friends/requests">友達申請</StyledLink>
        </LinkContainer>
      </Header>
      <List>
        {friends.map((friend) => (
          <FriendCard key={friend.id}>
            <Friend friend={friend} />
          </FriendCard>
        ))}
      </List>
    </Container>
  );
};

export default FriendsList;

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 2px solid #ddd;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    text-decoration: underline;
    color: #0056b3;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const FriendCard = styled.div`
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
`;
