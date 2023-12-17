import React, { useState, useMemo } from 'react';

import AuthContext from './index';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);

  const logOut = () => {
    localStorage.removeItem('userdata');
    setLoggedIn(false);
  };

  const memoAuth = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return <AuthContext.Provider value={memoAuth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
