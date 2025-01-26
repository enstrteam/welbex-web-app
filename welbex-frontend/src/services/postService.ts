import axios from 'axios';

const API_URL = 'http://localhost:3000/api/posts';  

export const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPost = async (content: string, mediaFile: File | null) => {
  const formData = new FormData();
  formData.append('content', content);

  if (mediaFile) {
    formData.append('media', mediaFile);  
  }

  const token = localStorage.getItem('token');
  
  const response = await axios.post(API_URL, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', 
    },
  });

  return response.data;
};

export const getPostById = async (postId: string) => {
  const response = await axios.get(`${API_URL}/${postId}`);
  return response.data;
};

export const updatePost = async (
  postId: string,
  content: string,
  mediaFile: File | null
) => {
  const formData = new FormData();
  formData.append('content', content);

  if (mediaFile) {
    formData.append('media', mediaFile);  
  }

  const token = localStorage.getItem('token');
  
  try {
    const response = await axios.put(`${API_URL}/${postId}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', 
      },
    });

    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении поста:', error);
    throw error;
  }
};

export const deletePost = async (postId: string) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/${postId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data;
};
