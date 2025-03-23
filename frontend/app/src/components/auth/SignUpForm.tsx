import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Container, Paper, Typography, Stack } from "@mui/material";
import axios from 'axios';
import { API_BASE_URL } from '../../constants';
import saveAuthHeaders from '../../hooks/saveHeader';

type FormData = {
  lastName: string;
  firstName: string;
  age: number;
  gender: string;
  email: string;
  password: string;
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [message, setMessage] = useState("");

  const resisterNewUser = async (data: FormData) => {
    const params = {
      lastname: data.lastName,
      firstname: data.firstName,
      age: data.age,
      gender: 1, // 後でenumなどを使用し、性別管理を数値でできるようにしてから修正予定
      email: data.email,
      password: data.password
    }
    try {
      const response = await axios.post(`${API_BASE_URL}auth`, params);
      saveAuthHeaders(response.headers);
      navigate('/');
    } catch (err) {
      setMessage('ログインに失敗しました')
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          新規会員登録
        </Typography>
        <form onSubmit={handleSubmit(resisterNewUser)}>
          <Stack spacing={2}>
            <TextField
              label="姓"
              {...register("lastName", { required: "姓を入力してください" })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              fullWidth
            />
            <TextField
              label="名"
              {...register("firstName", { required: "名を入力してください" })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              fullWidth
            />
            <TextField
              label="年齢"
              type="number"
              {...register("age", { required: "年齢を入力してください", min: 1 })}
              error={!!errors.age}
              helperText={errors.age?.message}
              fullWidth
            />
            <FormControl fullWidth error={!!errors.gender}>
              <InputLabel>性別</InputLabel>
              <Select
                {...register("gender", { required: "性別を選択してください" })}
                defaultValue=""
              >
                <MenuItem value="">選択してください</MenuItem>
                <MenuItem value="male">男性</MenuItem>
                <MenuItem value="female">女性</MenuItem>
                <MenuItem value="other">その他</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Email"
              type="email"
              {...register("email", { required: "メールアドレスを入力してください" })}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
            <TextField
              label="パスワード"
              type="password"
              {...register("password", { required: "パスワードを入力してください", minLength: 6 })}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              登録
            </Button>
          </Stack>
        </form>
        {message && (
          <Typography color="success.main" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default SignUpForm;
