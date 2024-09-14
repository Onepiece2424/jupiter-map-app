import { useState, useEffect } from 'react'
import axios from 'axios'

// User型の定義
type User = {
  id: number;
  firstname: string;
  lastname: string;
};

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

  // Tsの練習（後で削除してOK）----
  const greeting: string = "Hello";
  const target: string = "123";
  console.log(greeting + target);

  // ------------------------------

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
