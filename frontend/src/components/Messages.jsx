import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import React, { useRef, useEffect } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import useSocket from '../hooks/socket';
import { chatSchema } from '../validation/validationSchema';

const Messages = () => {
  const { t } = useTranslation();
  const { addNewMessage } = useSocket();
  const inputMessage = useRef(null);

  useEffect(() => {
    inputMessage.current.focus();
  }, []);

  const { channels, currentChannelId } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);

  const currentChannelName = channels.find((el) => el.id === currentChannelId)?.name ?? '';

  const currentMessages = messages.filter((el) => el.channelId === currentChannelId);
  const currentMessagesLength = currentMessages.length;

  const formik = useFormik({
    initialValues: { body: '' },

    validationSchema: chatSchema(t('messageBody')),

    onSubmit: (values) => {
      const { body } = values;
      const { username } = JSON.parse(localStorage.getItem('userdata'));

      if (body) {
        const newMessage = {
          body,
          channelId: currentChannelId,
          username,
        };

        try {
          addNewMessage(newMessage);
          formik.resetForm();
        } catch (err) {
          toast.error(t('errors.message'));
        }
      }

      inputMessage.current.focus();
    },
  });

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># </b>
            <b>{filter.clean(currentChannelName)}</b>
          </p>
          <span className="text-muted">
            {t('messagesCounter.messages', { count: currentMessagesLength })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentMessagesLength === 0
            ? ''
            : currentMessages.map((el) => (
              <div className="text-break mb-2" key={el.id}>
                <b>{filter.clean(el.username)}</b>
                {': '}
                {filter.clean(el.body)}
              </div>
            ))}
        </div>

        <div className="mt-auto px-5 py-3">
          <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
            <Form.Group className="input-group">
              <Form.Label className="visually-hidden" htmlFor="body">{t('newMessage')}</Form.Label>
              <Form.Control
                name="body"
                aria-label={t('newMessage')}
                placeholder={t('placeholders.newMessage')}
                className="border-0 p-0 ps-2"
                onChange={formik.handleChange}
                value={formik.values.body}
                ref={inputMessage}
              />
              <Button
                type="submit"
                disabled={!formik.values.body}
                variant=""
                className="btn-group-vertical border-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                </svg>
                <span className="visually-hidden">
                  {t('send')}
                </span>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default Messages;
