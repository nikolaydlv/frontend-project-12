import React from 'react';
import filter from 'leo-profanity';
import { useDispatch } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { changeCurrentChannel } from '../slices/channelsSlice';
import { openModal } from '../slices/modalSlice';

const Channel = ({ el, currentChannelId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChangeClick = (id) => {
    dispatch(changeCurrentChannel(id));
  };

  return (
    <li className="nav-item w-100" key={el.id}>
      <ButtonGroup className="d-flex show dropdown">
        <Button
          onClick={() => handleChangeClick(el.id)}
          variant={el.id === currentChannelId ? 'secondary' : 'light'}
          className="w-100 rounded-0 text-start text-truncate"
        >
          <span className="me-1">#</span>
          {filter.clean(el.name)}
        </Button>

        {el.removable && (
          <Dropdown>
            <Dropdown.Toggle
              split
              variant={el.id === currentChannelId ? 'secondary' : 'light'}
              className="flex-grow-0 dropdownCustom"
            >
              <span className="visually-hidden">{t('modal.toggle')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => dispatch(openModal({ type: 'removing', targetId: el.id }))}>
                {t('modal.remove')}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(openModal({ type: 'renaming', targetId: el.id }))}>
                {t('modal.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </ButtonGroup>
    </li>
  );
};

export default Channel;
