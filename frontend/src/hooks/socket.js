import { useContext } from 'react';

import { SocketContext } from '../contexts/index';

const useSocket = () => useContext(SocketContext);

export default useSocket;
