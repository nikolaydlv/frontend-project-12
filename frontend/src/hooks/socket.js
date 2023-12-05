import { useContext } from 'react';

import { SocketContext } from '../contexts/index.js';

const useSocket = () => useContext(SocketContext);

export default useSocket;
