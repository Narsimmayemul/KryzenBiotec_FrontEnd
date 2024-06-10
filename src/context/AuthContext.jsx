import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  const signIn = (credentials) => {
   
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.username === 'user' && credentials.password === 'password') {
          setUser({ username: credentials.username }); 
          resolve({ username: credentials.username });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const signUp = (userInfo) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setUser({ username: userInfo.username }); 
        resolve({ username: userInfo.username });
      }, 1000); 
    });
  };

  const signOut = () => {
   
    setUser(null); 
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
