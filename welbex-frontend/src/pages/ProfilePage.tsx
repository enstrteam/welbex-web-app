import { Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext'; // Импортируем хук контекста

export default function ProfilePage() {
  const { userName, email, isAuthenticated } = useAuth(); // Получаем данные пользователя из контекста
  const navigate = useNavigate();

  // Если нет данных о пользователе (не авторизован), редиректим на страницу входа
  if (!isAuthenticated) {
    navigate('/login');
    return null; // Чтобы не рендерить страницу, пока не выполнен редирект
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          textAlign: 'center',
          padding: 3,
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Профиль пользователя
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Имя: {userName}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Email: {email}
        </Typography>
      </Box>
    </Container>
  );
}
