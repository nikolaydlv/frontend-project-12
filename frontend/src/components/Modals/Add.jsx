import { toast } from 'react-toastify';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useRollbar } from '@rollbar/react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useSocket } from '../../hooks';
import { newChannelSchema } from '../../validation/validationSchema';
import { actions as modalsActions } from '../../slices/modalSlice';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';

const Add = () => {
  const { t } = useTranslation();
  const socket = useSocket();
  const rollbar = useRollbar();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const isOpened = useSelector((state) => state.modals.isOpened);
  const channels = useSelector(channelsSelectors.selectChannelsNames);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: { body: '' },

    validationSchema: newChannelSchema(channels, t('modal.unique'), t('modal.lengthParams')),

    validateOnBlur: false,

    validateOnChange: false,

    onSubmit: async ({ body }) => {
      try {
        await socket.addChannel({ name: body });
        dispatch(modalsActions.close());
        toast.success(t('success.newChannel'));
      } catch (error) {
        toast.error(t('errors.network'));
        rollbar.error('AddChannel', error);
      }
    },
  });

  const handleClose = () => dispatch(modalsActions.close());

  const isInvalidName = formik.errors.body && formik.touched.body;

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.add')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="body">
            <Form.Control
              required
              type="text"
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              isInvalid={isInvalidName}
              disabled={formik.isSubmitting}
              name="body"
            />
            <Form.Label visuallyHidden>{t('modal.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.body}</Form.Control.Feedback>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>{t('modal.cancel')}</Button>
              <Button type="submit" variant="primary" disabled={formik.isSubmitting}>{t('send')}</Button>
            </Modal.Footer>
          </Form.Group>
        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default Add;
