import { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form';
import GoogleMaps from './GoogleMaps';

// User型の定義
type User = {
  id: number;
  firstname: string;
  lastname: string;
};

// フォームデータの型定義
interface FormData {
  placeName: string;
  password: string;
}


const UserData = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get<User[]>('http://localhost:3000/users')
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const { register, handleSubmit } = useForm<FormData>();

  // onSubmitの型定義
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div>ユーザーデータだよ。</div>
      {users && users.map((user) => (
        <div key={user.id}>
          <p>{user.firstname} {user.lastname}</p>
        </div>
      ))}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="placeName">地名を入力</label>
          <input id="placeName" {...register('placeName')} />
          <button type="submit">検索</button>
        </form>
        <GoogleMaps />
      </div>
    </>
  )
}

export default UserData
