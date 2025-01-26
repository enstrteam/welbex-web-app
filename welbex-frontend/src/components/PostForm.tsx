import React, { useState } from 'react';
import { TextField, Button, Box, Container } from '@mui/material';

interface PostFormProps {
  onCreatePost: (content: string, mediaFile: File | null) => void;
}

export const PostForm: React.FC<PostFormProps> = ({ onCreatePost }) => {
  const [content, setContent] = useState<string>('');
  const [media, setMedia] = useState<File | null>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const allowedTypes = ['image/', 'video/'];

      if (allowedTypes.some((type) => selectedFile.type.startsWith(type))) {
        setMedia(selectedFile);
      } else {
        alert('Можно загружать только изображения или видео');
      }
    } else {
      setMedia(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('Пожалуйста, введите текст поста');
      return;
    }

    // Отправка данных через FormData, если выбран медиафайл
    onCreatePost(content, media); // Отправляем контент и файл
    setContent('');
    setMedia(null);
  };

  return (
    <Container component="form" onSubmit={handleSubmit} sx={{ mt: 2}}>
      <TextField
        label="Сообщение"
        multiline
        fullWidth
        variant="outlined"
        value={content}
        onChange={handleContentChange}
        required
        sx={{ mb: 2 }} // Добавляем отступ снизу
      />
      <Box sx={{ mt: 2 }}>
        <input
          type="file"
          accept="image/*, video/*"
          onChange={handleMediaChange}
          style={{ marginBottom: '16px' }} // Отступ снизу для файла
        />
      </Box>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Опубликовать
      </Button>
    </Container>
  );
};
