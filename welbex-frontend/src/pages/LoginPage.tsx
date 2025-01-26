import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService'; 
import { AuthData, getUserProfile } from '../services/authService'; 
import axios from 'axios';
import { useAuth } from '../store/AuthContext'; 

export default function LoginPage() {
  const { login } = useAuth();
  
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const [error, setError] = useState<string>(''); 
  const navigate = useNavigate();


const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault();
  setError('');

  const userData: AuthData = { email, password };

  try {
    const data = await loginUser(userData);

    localStorage.setItem('token', data.token);

    const userProfile = await getUserProfile(data.token);

    if (userProfile) {
      localStorage.setItem('id', String(userProfile.id));
      localStorage.setItem('user', userProfile.name);
      localStorage.setItem('email', email);
    } else {
      throw new Error('Имя пользователя не получено');
    }

    login(userProfile.id, userProfile.name, email, data.token);

    navigate('/');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      setError(error.response?.data?.message || 'Ошибка авторизации');
      console.error('AxiosError:', error.response?.data);
    } else {
      setError('Произошла неизвестная ошибка');
      console.error('Unexpected Error:', error);
    }
  }
};


return (
  <Container maxWidth="sm">
    <Box sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Вход в блог
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 3,
          backgroundColor: 'white',  // Белый фон
          padding: 3,  // Отступы внутри формы
          borderRadius: 2,  // Скругление углов
          boxShadow: 2,  // Легкая тень для выделения формы
        }}
      >
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}  // Отступ снизу
        />
        <TextField
          fullWidth
          label="Пароль"
          type="password"
          variant="outlined"
          margin="normal"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}  // Отступ снизу
        />
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Войти
        </Button>
      </Box>
      <Typography sx={{ mt: 2 }}>
        Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
      </Typography>
    </Box>
  </Container>
);

}
