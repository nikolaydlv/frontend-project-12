/* eslint-disable functional/no-conditional-statements */
/* eslint-disable functional/no-expression-statements */
import { toast } from 'react-toastify';

import { addMessage, removeAllChannelMessages } from '../slices/messagesSlice.js';
import {
  addChannel,
  changeCurrentChannel,
  removeChannel as removeChannelById,
  renameChannel as renameChannelById,
} from '../slices/channelsSlice.js';

const chatApi = (socket, store) => {
  const { dispatch } = store;

  const apiConnect = () => socket.connect();
  const apiDisconnect = () => socket.disconnect();

  socket.on('newMessage', (msg) => {
    dispatch(addMessage(msg));
  });

  const addNewMessage = (msg) => socket.emit('newMessage', msg, (resp) => {
    if (resp.status !== 'ok') {
      toast.error(resp.status);
    }
  });

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  const addNewChannel = (channel) => socket.emit('newChannel', channel, (resp) => {
    if (resp.status === 'ok') {
      dispatch(changeCurrentChannel(resp.data.id));
    } else {
      toast.error(resp.status);
    }
  });

  socket.on('removeChannel', (id) => {
    dispatch(removeChannelById(id));
    dispatch(removeAllChannelMessages(id));
  });

  const removeChannel = (id) => socket.emit('removeChannel', { id }, (resp) => {
    if (resp.status !== 'ok') {
      toast.error(resp.status);
    }
  });

  socket.on('renameChannel', (channel) => {
    dispatch(renameChannelById(channel));
  });

  const renameChannel = (channel) => socket.emit('renameChannel', channel, (resp) => {
    if (resp.status !== 'ok') {
      toast.error(resp.status);
    }
  });

  return {
    apiConnect,
    apiDisconnect,
    addNewMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  };
};

export default chatApi;
