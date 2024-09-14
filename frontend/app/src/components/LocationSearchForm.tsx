import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

// フォームデータの型定義
interface FormData {
  placeName: string;
  password: string;
}

// setLat と setLng の型を定義
interface LocationSearchFormProps {
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
}

// FunctionComponent 型を使用せずに、直接プロパティの型を指定する
const LocationSearchForm = ({ setLat, setLng }: LocationSearchFormProps) => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.get(`http://localhost:3000/search_location`, {
        params: { place_name: data.placeName }
      });

      const { lat, lng } = response.data;
      setLat(lat);
      setLng(lng);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="placeName">地名を入力</label>
      <input id="placeName" {...register('placeName')} />
      <button type="submit">検索</button>
    </form>
  )
}

export default LocationSearchForm
