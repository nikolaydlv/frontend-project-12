/* eslint-disable functional/no-expression-statements */
import store from '../slices/index.js';
import { addMessage } from '../slices/messagesSlice.js'; //

const socketApi = (socket) => {
  const { dispatch } = store;

  const apiConnect = () => socket.connect();
  const apiDisconnect = () => socket.disconnect();

  socket.on('newMessage', (msg) => {
    dispatch(addMessage(msg));
  });

  const addNewMessage = (msg) => socket.emit('newMessage', msg, (resp) => {
    // eslint-disable-next-line functional/no-conditional-statements
    if (resp.status !== 'ok') {
      console.log(resp.status);
    }
  });

  return { apiConnect, apiDisconnect, addNewMessage };
};

export default socketApi;
