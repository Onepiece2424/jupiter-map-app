import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import styled from 'styled-components';
import { headers } from '../api/client';

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
      const response = await axios.get(`http://localhost:3000/search_location?place_name=${data.placeName}`, { headers });
      const { lat, lng } = response.data;
      setLat(lat);
      setLng(lng);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <input className="placeName" {...register('placeName')} placeholder="地名を入力してください" />
      <button type="submit">検索</button>
    </FormWrapper>
  )
}

const FormWrapper = styled.form`
  .placeName {
    font-weight: bold;
    width: 180px;
    margin: 0 10px;
  }
`

export default LocationSearchForm
