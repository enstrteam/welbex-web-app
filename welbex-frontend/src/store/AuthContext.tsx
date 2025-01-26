import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  authUserId: number;
  userName: string;
  email: string;
  login: (userId: number, userName: string, email: string, token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [authUserId, setAuthUserId] = useState<number>(0);

  useEffect(() => {
    const authUserId = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const storedEmail = localStorage.getItem('email');

    if (token && user && storedEmail) {
      setIsAuthenticated(true);
      setAuthUserId(Number(authUserId));
      setUserName(user);
      setEmail(storedEmail);
    }
  }, []);

  const login = (authUserId: number, userName: string, email: string, token: string) => {
   
    localStorage.setItem('id', authUserId.toString());
    localStorage.setItem('token', token);
    localStorage.setItem('user', userName);
    localStorage.setItem('email', email);
    setIsAuthenticated(true);
    setAuthUserId(Number(authUserId));
    setUserName(userName);
    setEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    setIsAuthenticated(false);
    setAuthUserId(0);
    setUserName('');
    setEmail('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authUserId, userName, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
