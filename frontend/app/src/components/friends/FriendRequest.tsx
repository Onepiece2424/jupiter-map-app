import { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { suggestionsUsersListState } from '../../atoms/suggestionsUsers';
import { API_BASE_URL } from '../../constants';
import axios from 'axios';

const FriendRequest = () => {
  const [suggestionsUsers, setSuggestionsUsers] = useRecoilState(suggestionsUsersListState);

  useEffect(() => {
    const fetchFriends = async() => {
      try {
        const response = await axios.get(`${API_BASE_URL}users/suggestions`, { withCredentials: true })
        setSuggestionsUsers(response.data)
      } catch(error) {
        console.log("友達候補のデータを取得できませんでした")
      }
    }

    fetchFriends();
  }, [setSuggestionsUsers])

  return (
    <div>友達申請</div>
  )
}

export default FriendRequest
