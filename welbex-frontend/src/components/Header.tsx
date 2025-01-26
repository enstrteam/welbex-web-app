import { Box, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

const Header = () => {
  const { isAuthenticated, userName, logout } = useAuth(); // Используем данные из контекста
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Link
        href="/"
        underline="none"
        color="inherit"
        sx={{
          transition: 'opacity 0.2s',
          '&:hover': {
            opacity: 0.5,
          },
        }}
      >
        <Typography variant="h6">My App</Typography>
      </Link>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!isAuthenticated ? (
          <Link href="/login" underline="hover">
            <Button size="small" variant="outlined" color="primary">
              Войти
            </Button>
          </Link>
        ) : (
          <>
            <Typography variant="body1" sx={{ marginRight: '20px' }}>
              {userName} {/* Отображаем имя пользователя */}
            </Typography>
            <Link href="/profile" underline="hover">
              <Button size="small" variant="outlined" color="primary">
                Профиль
              </Button>
            </Link>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={handleLogout}
              sx={{ marginLeft: '10px' }}
            >
              Выйти
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;
