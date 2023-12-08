/* eslint-disable functional/no-expression-statements */
import { toast } from 'react-toastify';
import React, { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import useSocket from '../../hooks/socket.js';
import { closeModal } from '../../slices/modalSlice';
import { newChannelSchema } from '../../validation/validationSchema';

const RenameChannel = () => {
  const { t } = useTranslation();
  const { renameChannel } = useSocket();
  const dispatch = useDispatch();
  const inputModal = useRef(null);

  useEffect(() => {
    inputModal.current.focus();
  }, []);

  const { channels } = useSelector((state) => state.channels);
  const { modals } = useSelector((state) => state.modals);
  const { isShown, targetId } = modals;
  const currentChanel = channels.find((el) => el.id === targetId);

  const formik = useFormik({
    initialValues: { channelName: currentChanel.name },

    validationSchema: newChannelSchema(channels, t('modal.unique'), t('modal.lengthParams')),

    onSubmit: (values) => {
      renameChannel({ name: values.channelName, id: targetId });
      dispatch(closeModal());
      toast.success(t('success.renameChannel'));
    },
  });

  const handleClose = () => dispatch(closeModal());

  return (
    <Modal show={isShown} centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modal.rename')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Label className="visually-hidden" htmlFor="channelName">{t('modal.rename')}</Form.Label>
          <Form.Control
            id="channelName"
            name="channelName"
            className="mb-2"
            onChange={formik.handleChange}
            value={formik.values.channelName}
            isInvalid={formik.errors.channelName && formik.touched.channelName}
            disabled={formik.isSubmitting}
            ref={inputModal}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.channelName}</Form.Control.Feedback>

          <div className="d-flex justify-content-end">
            <Button onClick={handleClose} variant="secondary" className="me-2">{t('cancel')}</Button>
            <Button type="submit" variant="primary">{t('send')}</Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
