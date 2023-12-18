import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Button } from 'react-bootstrap';

import Channel from './Channel';
import getModal from './modal';
import { openModal } from '../slices/modalSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector((state) => state.channels);

  const selector = useSelector((state) => state.modals);
  const { modalType } = selector.modals;

  const renderModal = () => {
    if (modalType === '') {
      return null;
    }

    const Component = getModal(modalType);

    return <Component />;
  };

  return (
    <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channelsTitle')}</span>
        <Button
          variant=""
          className="p-0 text-primary btn-group-vertical"
          onClick={() => dispatch(openModal({ type: 'adding', targetId: null }))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>

      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((el) => (
          <Channel key={el.id} el={el} currentChannelId={currentChannelId} />
        ))}
      </ul>
      { renderModal() }
    </Col>
  );
};

export default Channels;
