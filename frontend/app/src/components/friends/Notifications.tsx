import { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { useRecoilState } from "recoil";
import { notificationsUsersListState } from "../../atoms/notificationsUsers";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Notifications = () => {
  const [notificationsUsers, setNotificationsUsers] = useRecoilState(notificationsUsersListState);

  useEffect(() => {
    const fetchNotificationsUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}users/notifications`, { withCredentials: true });
        setNotificationsUsers(response.data);
      } catch (error) {
        console.log("申請通知を取得できませんでした");
      }
    };

    fetchNotificationsUsers();
  }, [setNotificationsUsers]);

  const approveRequest = async (user: any) => {
    const params = { user };
    await axios.post(`${API_BASE_URL}friendships`, params, { withCredentials: true });
  };

  const rejectRequest = async (user: any) => {
    const params = { user };
    await axios.put(`${API_BASE_URL}friend_requests/reject`, params, { withCredentials: true });
  };

  return (
    <Container>
      <Header>
        <Title>友達通知</Title>
        <LinkContainer>
          <StyledLink to="/friends">友達一覧</StyledLink>
        </LinkContainer>
      </Header>
      <NotificationList>
        {notificationsUsers.length > 0 ? (
          notificationsUsers.map((user) => (
            <NotificationCard key={user.id}>
              <UserInfo>
                <UserName>{user.firstname} {user.lastname}</UserName>
                <UserDetails>ID: {user.id}</UserDetails>
                <UserDetails>年齢: {user.age}</UserDetails>
                <UserDetails>性別: {user.gender}</UserDetails>
                <UserDetails>Eメール: {user.email}</UserDetails>
              </UserInfo>
              <ButtonGroup>
                <ApproveButton onClick={() => approveRequest(user)}>承認</ApproveButton>
                <RejectButton onClick={() => rejectRequest(user)}>却下</RejectButton>
              </ButtonGroup>
            </NotificationCard>
          ))
        ) : (
          <NoNotifications>通知はありません</NoNotifications>
        )}
      </NotificationList>
    </Container>
  );
};

export default Notifications;

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
  margin-bottom: 15px;
`;

const Title = styled.h2`
  margin: 0;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NotificationCard = styled.div`
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ApproveButton = styled.button`
  background: #28a745;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #218838;
  }
`;

const RejectButton = styled.button`
  background: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #c82333;
  }
`;

const NoNotifications = styled.p`
  text-align: center;
  color: #888;
  font-size: 16px;
`;
