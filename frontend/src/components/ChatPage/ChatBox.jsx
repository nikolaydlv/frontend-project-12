import { useSelector } from 'react-redux';

import ChannelsBox from './Channels/ChannelsBox';
import MessagesBox from './Messages/MessagesBox';
import LoadingSpinner from './LoadingSpinner';

const statuses = {
  loading: 'loading',
  loaded: 'loaded',
  loadError: 'loadError',
};

const ChatBox = () => {
  const loadingStatus = useSelector((state) => state.channels.loadingStatus);

  switch (loadingStatus) {
    case statuses.loaded:
      return (
        <>
          <ChannelsBox />
          <MessagesBox />
        </>
      );

    default:
      return <LoadingSpinner />;
  }
};

export default ChatBox;
