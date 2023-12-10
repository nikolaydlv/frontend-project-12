/* eslint-disable functional/no-expression-statements */
import { io } from 'socket.io-client';
import './styles/index.scss';

import initApp from './init.jsx';

const socket = io();

initApp(socket);
