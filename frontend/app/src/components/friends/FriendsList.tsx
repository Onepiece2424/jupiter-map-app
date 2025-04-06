import { useEffect } from "react"
import axios from "axios"
import { API_BASE_URL } from "../../constants"
import { useRecoilState } from "recoil"
import { friendListState } from "../../atoms/friend"
import Friend from "./Friend"
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
      <strong>友達一覧</strong>
      <ListContainer>
        {friends.map((friend) => (
          <Friend key={friend.id} friend={friend} />
        ))}
      </ListContainer>
    </>
  )
}

export default FriendsList

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  background: #f5f5f5;
`;
