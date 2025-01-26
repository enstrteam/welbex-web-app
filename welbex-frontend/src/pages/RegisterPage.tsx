import { Container, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { useState } from 'react';
import { AxiosError } from 'axios'; // Импортируем AxiosError

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Схема валидации с Yup
const schema = yup.object({
  name: yup.string().required('Введите имя'),
  email: yup.string().email('Некорректный email').required('Введите email'),
  password: yup
    .string()
    .min(6, 'Пароль должен быть не менее 6 символов')
    .required('Введите пароль'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Подтвердите пароль'),
});

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState<boolean>(false); // Стейт загрузки
  const [error, setError] = useState<string>(''); // Стейт ошибки
  const navigate = useNavigate();

  // Обработчик отправки данных формы
  const onSubmit = async (data: RegisterData): Promise<void> => {
    setLoading(true);
    setError(''); // Сбрасываем ошибку при каждой попытке отправки формы

    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      alert('Регистрация успешна!');
      navigate('/login');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || 'Ошибка регистрации');
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Произошла неизвестная ошибка');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Регистрация
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
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
            label="Имя"
            variant="outlined"
            margin="normal"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ mb: 2 }}  // Отступ снизу
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 2 }}  // Отступ снизу
          />
          <TextField
            fullWidth
            label="Пароль"
            type="password"
            variant="outlined"
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 2 }}  // Отступ снизу
          />
          <TextField
            fullWidth
            label="Повторите пароль"
            type="password"
            variant="outlined"
            margin="normal"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
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
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Зарегистрироваться'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
  
}
