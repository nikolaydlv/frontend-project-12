import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { SocketContext } from './index';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as channelsActions } from '../slices/channelsSlice';

const ApiProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const connectSocket = useCallback(() => {
    socket.connect();

    socket.on('newMessage', (message) => {
      dispatch(messagesActions.addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      dispatch(channelsActions.addChannel(channel));
    });

    socket.on('removeChannel', ({ id }) => {
      dispatch(channelsActions.removeChannel(id));
    });

    socket.on('renameChannel', (channel) => {
      dispatch(channelsActions.renameChannel({ id: channel.id, changes: { name: channel.name } }));
    });
  }, [dispatch, socket]);

  const disconnectSocket = useCallback(() => {
    socket.disconnect();
  }, [socket]);

  const sendMessage = useCallback(
    async (message) => {
      await socket.timeout(3000).emitWithAck('newMessage', message);
    },
    [socket],
  );

  const addChannel = useCallback(
    async (channel) => {
      const { data } = await socket.timeout(3000).emitWithAck('newChannel', channel);

      dispatch(channelsActions.addChannel(data));
      dispatch(channelsActions.switchChannel({ id: data.id }));
    },
    [socket, dispatch],
  );

  const removeChannel = useCallback(
    async (targetId) => {
      await socket.timeout(3000).emitWithAck('removeChannel', { id: targetId });
    },
    [socket],
  );

  const renameChannel = useCallback(
    async (updateChannelInfo) => {
      await socket.timeout(3000).emitWithAck('renameChannel', updateChannelInfo);
    },
    [socket],
  );

  const socketContext = useMemo(
    () => ({
      connectSocket,
      sendMessage,
      addChannel,
      removeChannel,
      renameChannel,
      disconnectSocket,
    }),
    [
      connectSocket,
      sendMessage,
      addChannel,
      removeChannel,
      renameChannel,
      disconnectSocket,
    ],
  );

  return <SocketContext.Provider value={socketContext}>{children}</SocketContext.Provider>;
};

export default ApiProvider;
