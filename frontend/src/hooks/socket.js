import { useContext } from 'react';

import { SocketContext } from '../contexts/index.jsx';

const useSocket = () => useContext(SocketContext);

export default useSocket;
