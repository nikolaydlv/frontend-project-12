import { useCallback, useMemo, useState } from 'react';

import { AuthContext } from './index';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const userName = currentUser ? { username: currentUser.username } : null;
  const [user, setUser] = useState(userName);

  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const getAuthHeader = useCallback(() => {
    const userId = JSON.parse(localStorage.getItem('user'));

    return userId?.token
      ? { Authorization: `Bearer ${userId.token}` }
      : {};
  }, []);

  const memoAuth = useMemo(
    () => (
      {
        user, logIn, logOut, getAuthHeader,
      }),
    [user, logIn, logOut, getAuthHeader],
  );

  return <AuthContext.Provider value={memoAuth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
