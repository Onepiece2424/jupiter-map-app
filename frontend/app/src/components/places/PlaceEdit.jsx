import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { updateFavoritePlaceDetail } from "../../api/favoritePlace";

const PlaceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setValue("image", file); // useForm に画像データをセット
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async(data) => {
    try {
      await updateFavoritePlaceDetail(id, data)
      navigate(`/favorite_places/${id}`)
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <ImageUploadContainer>
            <Label>画像</Label>
            {imagePreview && <ImagePreview src={imagePreview} alt="プレビュー" />}
            <ImageLabel htmlFor="imageUpload">画像を選択</ImageLabel>
            <ImageInput
              type="file"
              id="imageUpload"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
            />
          </ImageUploadContainer>
        </FormGroup>
        <FormGroup>
          <Label>場所名</Label>
          <Input {...register("placeName")} />
        </FormGroup>
        <FormGroup>
          <Label>住所</Label>
          <Input {...register("address")} />
        </FormGroup>
        <FormGroup>
          <Label>お気に入りポイント</Label>
          <Input {...register("description")} />
        </FormGroup>
        <SubmitButton type="submit">送信</SubmitButton>
      </FormContainer>
    </Container>
  );
};

// スタイル定義
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ImageLabel = styled.label`
  background-color: #007bff;
  color: white;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default PlaceEdit;
