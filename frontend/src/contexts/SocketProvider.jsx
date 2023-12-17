import React, { useMemo } from 'react';

import { SocketContext } from './index';

const SocketProvider = ({ api, children }) => {
  const {
    addNewMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  } = api;

  const values = useMemo(() => (
    {
      addNewMessage,
      addNewChannel,
      removeChannel,
      renameChannel,
    }), [addNewMessage, addNewChannel, removeChannel, renameChannel]);

  return <SocketContext.Provider value={values}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
