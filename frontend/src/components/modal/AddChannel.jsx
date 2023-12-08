/* eslint-disable functional/no-expression-statements */
import { toast } from 'react-toastify';
import React, { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import useSocket from '../../hooks/socket.js';
import { closeModal } from '../../slices/modalSlice.js';
import { newChannelSchema } from '../../validation/validationSchema.js';

const AddChannel = () => {
  const { t } = useTranslation();
  const { addNewChannel } = useSocket();
  const dispatch = useDispatch();
  const inputModal = useRef(null);

  useEffect(() => {
    inputModal.current.focus();
  }, []);

  const { channels } = useSelector((state) => state.channels);
  const { modals } = useSelector((state) => state.modals);
  const { isShown } = modals;

  const formik = useFormik({
    initialValues: { channelName: '' },

    validationSchema: newChannelSchema(channels, t('modal.unique'), t('modal.lengthParams')),

    onSubmit: (values) => {
      addNewChannel({ name: values.channelName });
      formik.resetForm();
      dispatch(closeModal());
      toast.success(t('success.newChannel'));
    },
  });

  const handleClose = () => dispatch(closeModal());

  return (
    <Modal show={isShown} centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modal.add')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Label className="visually-hidden" htmlFor="channelName">{t('modal.add')}</Form.Label>
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

export default AddChannel;
