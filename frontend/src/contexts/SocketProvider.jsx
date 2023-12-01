import React, { useMemo } from 'react';

import { SocketContext } from './index.jsx';

const SocketProvider = ({ api, children }) => {
  const { addNewMessage } = api;
  const functions = useMemo(() => ({ addNewMessage }), [addNewMessage]);

  return (
    <SocketContext.Provider value={functions}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
