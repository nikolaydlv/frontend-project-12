import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import ChatNavbar from './Navbar/ChatNavbar';
import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignupPage/SignupPage';
import ChatPage from './ChatPage/ChatPage';
import NotFoundPage from './Errors/NotFoundPage';

import { useAuth } from '../hooks';
import { appPaths } from '../routes';

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  return auth.user ? children : <Navigate to={appPaths.login} />;
};

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <ToastContainer />
      <ChatNavbar />

      <Routes>
        <Route path={appPaths.login} element={<LoginPage />} />
        <Route path={appPaths.signUp} element={<SignupPage />} />
        <Route
          path={appPaths.chat}
          element={(
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          )}
        />
        <Route path={appPaths.notFound} element={<NotFoundPage />} />
      </Routes>

    </div>
  </BrowserRouter>
);

export default App;
