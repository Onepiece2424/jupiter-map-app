import { useState, useEffect } from 'react'
import { User } from '../types/types';
import axios from 'axios'

const UserData = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get<User[]>('http://localhost:3000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  return (
    <>
      <div>ユーザーデータだよ。</div>
      {users && users.map((user) => (
        <div key={user.id}>
          <p>{user.firstname} {user.lastname}</p>
        </div>
      ))}
    </>
  )
}

export default UserData
