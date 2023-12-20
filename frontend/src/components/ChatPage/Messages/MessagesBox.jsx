import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

import Message from './Message';
import MessageForm from './MessageForm';

import { selectors as messagesSelectors } from '../../../slices/messagesSlice';
import { selectors as channelsSelectors } from '../../../slices/channelsSlice';
import { useFilter } from '../../../hooks';

const MessagesBox = () => {
  const { t } = useTranslation();
  const messagesRef = useRef(null);
  const currentChannel = useSelector(channelsSelectors.selectCurrentChannel);
  const currentMessages = useSelector(messagesSelectors.selectById);
  const filterProfanity = useFilter();

  const channelName = filterProfanity(currentChannel.name);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
    }
  }, [currentMessages]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {channelName}
            </b>
          </p>
          <span className="text-muted">
            {t('messagesCounter.messages', { count: currentMessages.length })}
          </span>
        </div>

        <div ref={messagesRef} className="chat-messages overflow-auto px-5">
          {currentMessages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
        <MessageForm />
      </div>
    </Col>
  );
};

export default MessagesBox;
