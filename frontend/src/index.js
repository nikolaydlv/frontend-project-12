import { io } from 'socket.io-client';
import './styles/index.scss';

import initApp from './init';

const socket = io();

initApp(socket);
