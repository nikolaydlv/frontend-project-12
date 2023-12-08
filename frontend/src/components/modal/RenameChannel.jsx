/* eslint-disable functional/no-expression-statements */
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import ModalInput from './ModalInput.jsx';

import useSocket from '../../hooks/socket.js';
import { closeModal } from '../../slices/modalSlice';
import { newChannelSchema } from '../../validation/validationSchema';

const RenameChannel = () => {
  const { t } = useTranslation();
  const { renameChannel } = useSocket();
  const dispatch = useDispatch();
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

  const values = {
    isShown,
    handleClose,
    title: t('modal.rename'),
    formik,
    cancelButton: t('cancel'),
    submitButton: t('send'),
  };

  return <ModalInput values={values} />;
};

export default RenameChannel;
