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
  const [lat, setLat] = useState<number | null>(35.801757);
  const [lng, setLng] = useState<number | null>(139.714783);

  useEffect(() => {
    axios.get<User[]>('http://localhost:3000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const { register, handleSubmit } = useForm<FormData>();

  // onSubmitの型定義
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Rails APIに地名を送信
      const response = await axios.get(`http://localhost:3000/search_location`, {
        params: { place_name: data.placeName } // パラメータとして地名を渡す
      });

      const { lat, lng } = response.data; // 緯度と経度を取得
      setLat(lat); // 緯度を更新
      setLng(lng); // 経度を更新
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <div>ユーザーデータだよ。</div>
      {users && users.map((user) => (
        <div key={user.id}>
          <p>{user.firstname} {user.lastname}</p>
        </div>
      ))} */}
      <div className='main-container'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="placeName">地名を入力</label>
          <input id="placeName" {...register('placeName')} />
          <button type="submit">検索</button>
        </form>
        {lat !== null && lng !== null && <GoogleMaps lat={lat} lng={lng} />}
      </div>
    </>
  )
}

export default UserData
