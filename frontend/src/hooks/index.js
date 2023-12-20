import { useContext } from 'react';

import { AuthContext, SocketContext, FilterContext } from '../contexts/index';

export const useAuth = () => useContext(AuthContext);

export const useSocket = () => useContext(SocketContext);

export const useFilter = () => useContext(FilterContext);
