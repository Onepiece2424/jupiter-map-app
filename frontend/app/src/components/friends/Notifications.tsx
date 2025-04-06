import { useEffect } from 'react'
import axios from "axios"
import { API_BASE_URL } from "../../constants"
import { useRecoilState } from "recoil"
import { notificationsUsersListState } from '../../atoms/notificationsUsers'

const Notifications = () => {
  const [notificationsUsers, setNotificationsUsers] = useRecoilState(notificationsUsersListState);

  useEffect(() => {
    const fetchNotificationsUsers = async() => {
      try {
        const response = await axios.get(`${API_BASE_URL}users/notifications`, { withCredentials: true })
        setNotificationsUsers(response.data)
      } catch(error) {
        console.log("申請通知を取得できませんでした")
      }
    }

    fetchNotificationsUsers();
  }, [setNotificationsUsers])

  return (
    <div>Notifications</div>
  )
}

export default Notifications
