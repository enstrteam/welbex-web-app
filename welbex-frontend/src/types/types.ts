export interface User {
    name: string;
    email: string;
  }
  
  export interface PostInterface {
    id: string;
    content: string;
    userId: number;
    user: User;
    image: string;
    video: string;
    createdAt: string;
  }
  
  export interface PostProps {
    post: PostInterface;
    onPostUpdated: (updatedPost: PostInterface) => void;
    onPostDeleted: (postId: string) => void;
  }