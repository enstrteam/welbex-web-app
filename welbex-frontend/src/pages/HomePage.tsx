import { Container, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { getPosts, createPost } from '../services/postService';
import { Post } from '../components/Post';
import { PostForm } from '../components/PostForm';
import { useAuth } from '../store/AuthContext';
import { PostInterface } from '../types/types';
import axios from 'axios';

export default function HomePage() {
  const { isAuthenticated, userName } = useAuth();
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [error, setError] = useState<string>('');

  const loadPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError('Не удалось загрузить записи');
        console.log(error.response?.data);
      }
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreatePost = async (content: string, media: File | null) => {
    if (!isAuthenticated) {
      setError('Вы должны быть авторизованы, чтобы создать запись');
      return;
    }

    try {
      await createPost(content, media);
      await loadPosts();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError('Не удалось создать запись');
        console.log(error.response?.data);
      }
    }
  };

  const handlePostDeleted = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Box
          sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Добро пожаловать в блог!
          </Typography>
          {isAuthenticated && (
            <Typography variant="h6" sx={{ mt: 2 }}>
              Привет, {userName}!
            </Typography>
          )}
          {error && <Typography color="error">{error}</Typography>}
          {isAuthenticated && <PostForm onCreatePost={handleCreatePost} />}
        </Box>

        <Box sx={{ mt: 4 }}>
          {Array.isArray(posts) && posts.length > 0 ? (
            posts
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  onPostUpdated={(updatedPost) => {
                    setPosts((prevPosts) =>
                      prevPosts.map((p) =>
                        p.id === updatedPost.id ? updatedPost : p
                      )
                    );
                  }}
                  onPostDeleted={handlePostDeleted}
                />
              ))
          ) : (
            <Typography>Нет доступных записей</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
