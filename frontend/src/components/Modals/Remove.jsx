import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { useRollbar } from '@rollbar/react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { actions as modalsActions } from '../../slices/modalSlice';
import { useSocket } from '../../hooks';

const Remove = () => {
  const { t } = useTranslation();
  const socket = useSocket();
  const rollbar = useRollbar();
  const dispatch = useDispatch();
  const { isOpened, targetId } = useSelector((state) => state.modals);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => dispatch(modalsActions.close());

  const handleRemove = async () => {
    try {
      setIsSubmitting(true);
      await socket.removeChannel(targetId);
      dispatch(modalsActions.close());
      toast.success(t('success.removeChannel'));
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      toast.error(t('errors.network'));
      rollbar.error('RemoveChannel', error);
    }
  };

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Modal.Title>{t('modal.confirm')}</Modal.Title>
        <Modal.Footer>
          <Button className="me-2" variant="secondary" onClick={handleClose}>{t('modal.cancel')}</Button>
          <Button type="submit" variant="danger" onClick={handleRemove} disabled={isSubmitting}>{t('modal.remove')}</Button>
        </Modal.Footer>
      </Modal.Body>

    </Modal>
  );
};

export default Remove;
