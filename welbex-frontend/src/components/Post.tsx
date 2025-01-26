import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { useAuth } from '../store/AuthContext';
import { updatePost, deletePost } from '../services/postService';
import { PostProps } from '../types/types';
import axios from 'axios';

export const Post: React.FC<PostProps> = ({
  post,
  onPostUpdated,
  onPostDeleted,
}) => {
  const { id, content, userId, user, image, video } = post;
  const { authUserId } = useAuth();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>(content);
  const [newMedia, setNewMedia] = useState<File | null>(null);
  const [newImageUrl, setNewImageUrl] = useState<string>(image);
  const [newVideoUrl, setNewVideoUrl] = useState<string>(video);

  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewContent(content);
    setNewImageUrl(image);
    setNewVideoUrl(video);
  };

  const handleSaveEdit = async () => {
    try {
      if (!newContent.trim()) {
        alert('Контент не может быть пустым');
        return;
      }
  
      // Передаем только строки и файл, если он есть
      await updatePost(id, newContent, newMedia); // Передаем контент и медиа
  
      onPostUpdated({
        id,
        content: newContent,
        userId,
        user,
        image: newImageUrl,
        video: newVideoUrl,
        createdAt: post.createdAt,
      });
  
      setIsEditing(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        alert('Не удалось сохранить изменения');
      }
    }
  };
  

  const handleDelete = async () => {
    await deletePost(id);
    onPostDeleted(id);
  };

  return (
    <Card sx={{ mb: 2, position: 'relative', backgroundColor: 'white', borderRadius: 2, boxShadow: 2, width: '100%' }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">
            {post.user?.name || 'Неизвестный автор'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(post.createdAt).toLocaleString('ru-RU')}
          </Typography>
        </Box>
  
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'left' }}>
          {post.content}
        </Typography>
  
        {post.image && !isEditing && (
          <img
            src={post.image}
            alt="media"
            style={{
              width: '100%',
              height: 'auto',
              marginTop: '10px',
              borderRadius: '8px',
            }}
          />
        )}
  
        {post.video && !isEditing && (
          <video
            controls
            src={post.video}
            style={{
              width: '100%',
              height: 'auto',
              marginTop: '10px',
              borderRadius: '8px',
            }}
          />
        )}
  
        {/* Режим редактирования */}
        {isEditing && (
          <Box sx={{ mt: 2, backgroundColor: '#f9f9f9', padding: 2, borderRadius: 2 }}>
            <TextField
              label="Редактировать сообщение"
              multiline
              fullWidth
              variant="outlined"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <input
              type="file"
              accept="image/*, video/*"
              onChange={(e) =>
                setNewMedia(e.target.files ? e.target.files[0] : null)
              }
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancelEdit} variant="outlined" size="small">
                Отмена
              </Button>
              <Button
                onClick={handleSaveEdit}
                variant="contained"
                color="primary"
                size="small"
                sx={{ ml: 2 }}
              >
                Сохранить
              </Button>
            </Box>
          </Box>
        )}
  
        {/* Кнопки редактирования и удаления */}
        {authUserId === userId && !isEditing && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              onClick={handleEdit}
              variant="outlined"
              color="primary"
              size="small"
            >
              Редактировать
            </Button>
            <Button
              onClick={handleDelete}
              variant="outlined"
              color="error"
              size="small"
              sx={{ ml: 2 }}
            >
              Удалить
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};  