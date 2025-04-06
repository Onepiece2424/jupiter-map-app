import { useEffect } from "react"
import axios from "axios"
import { API_BASE_URL } from "../../constants"
import { useRecoilState } from "recoil"
import { friendListState } from "../../atoms/friend"
import Friend from "./Friend"
import { Link } from "react-router-dom"
import styled from 'styled-components'

const FriendsList = () => {
  const [friends, setFriends] = useRecoilState(friendListState);

  useEffect(() => {
    const fetchFriends = async() => {
      try {
        const response = await axios.get(`${API_BASE_URL}friends`, { withCredentials: true })
        setFriends(response.data)
      } catch(error) {
        console.log("友達データを取得できませんでした")
      }
    }

    fetchFriends();
  }, [setFriends])

  return (
    <>
      <TitleCotainer>
        <strong>友達一覧</strong>
        <LinkContainer>
          <FriendNotificationLink to='/friends/notifications'>友達通知</FriendNotificationLink>
          <FriendRequestLink to='/friends/requests'>友達申請</FriendRequestLink>
        </LinkContainer>
      </TitleCotainer>
      <ListContainer>
        {friends.map((friend) => (
          <Friend key={friend.id} friend={friend} />
        ))}
      </ListContainer>
    </>
  )
}

export default FriendsList

const TitleCotainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  position: relative;
`

const LinkContainer = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  gap: 12px;
`

const FriendNotificationLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`

const FriendRequestLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  background: #f5f5f5;
`;
