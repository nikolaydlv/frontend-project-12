import { toast } from 'react-toastify';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRollbar } from '@rollbar/react';
import { useTranslation } from 'react-i18next';

import { useAuth, useSocket } from '../../../hooks';
import { selectors as channelsSelectors } from '../../../slices/channelsSlice';
import { chatSchema } from '../../../validation/validationSchema';

const MessageForm = () => {
  const auth = useAuth();
  const socket = useSocket();
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const inputMessage = useRef(null);
  const currentChannelId = useSelector(channelsSelectors.selectCurrentChannelId);

  const formik = useFormik({
    initialValues: { messageText: '' },

    validationSchema: chatSchema(t('messageBody')),

    onSubmit: async (values, { resetForm }) => {
      const message = {
        body: values.messageText,
        channelId: currentChannelId,
        user: auth.user.username,
      };
      try {
        await socket.sendMessage(message);
        resetForm();
      } catch (error) {
        toast.error(t('errors.message'));
        rollbar.error('AddChannel', error);
      }
    },
  });

  useEffect(() => {
    if (inputMessage.current) {
      inputMessage.current.focus();
    }
  }, [currentChannelId]);

  useEffect(() => {
    if (formik.values.messageText === '') {
      inputMessage.current.focus();
    }
  }, [formik.values.messageText]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <InputGroup hasValidation={!formik.dirty || !formik.isValid}>

          <Form.Control
            ref={inputMessage}
            className="border-0 p-0 ps-2"
            name="messageText"
            type="text"
            placeholder={t('placeholders.newMessage')}
            aria-label={t('newMessage')}
            disabled={formik.isSubmitting}
            onChange={formik.handleChange}
            value={formik.values.messageText}
          />

          <Button
            type="submit"
            disabled={!formik.dirty || !formik.isValid}
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

        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
