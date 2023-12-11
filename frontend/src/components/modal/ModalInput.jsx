/* eslint-disable functional/no-expression-statements */
import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button } from 'react-bootstrap';

const ModalComponent = (props) => {
  const { values } = props;

  const {
    isShown,
    handleClose,
    title,
    formik,
    cancelButton,
    submitButton,
  } = values;

  const inputModal = useRef(null);

  useEffect(() => {
    inputModal.current.focus();
  }, []);

  const { t } = useTranslation();

  return (
    <Modal show={isShown} centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>

          <Form.Label className="visually-hidden" htmlFor="channelName">{t('modal.channelName')}</Form.Label>
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
            <Button onClick={handleClose} variant="secondary" className="me-2">{cancelButton}</Button>
            <Button type="submit" variant="primary">{submitButton}</Button>
          </div>

        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default ModalComponent;
