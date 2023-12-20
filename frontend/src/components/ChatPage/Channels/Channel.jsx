import {
  Button, ButtonGroup, Dropdown, Nav,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useFilter } from '../../../hooks';
import { actions as channelsActions } from '../../../slices/channelsSlice';
import { actions as modalsActions } from '../../../slices/modalSlice';

const Channel = ({ isActive, channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filterProfanity = useFilter();
  const channelName = filterProfanity(channel.name);

  const handleRemove = () => {
    dispatch(modalsActions.open({ type: 'removing', targetId: channel.id }));
  };

  const handleRename = () => {
    dispatch(modalsActions.open({ type: 'renaming', targetId: channel.id }));
  };

  const handleChoose = () => {
    dispatch(channelsActions.switchChannel({ id: channel.id }));
  };

  return (
    <Nav.Item className="w-100">
      {channel.removable ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button onClick={handleChoose} className="w-100 rounded-0 text-start text-truncate" variant={isActive ? 'secondary' : null}>
            <span>#</span>
            {' '}
            {channelName}
          </Button>

          <Dropdown.Toggle split variant={isActive ? 'secondary' : null} className="flex-grow-0" id="dropdown-split-basic">
            <span className="visually-hidden">{t('modal.toggle')}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRename}>{t('modal.rename')}</Dropdown.Item>
            <Dropdown.Item onClick={handleRemove}>{t('modal.remove')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button onClick={handleChoose} className="w-100 rounded-0 text-start" variant={isActive ? 'secondary' : null}>
          <span>#</span>
          {' '}
          {channel.name}
        </Button>
      )}
    </Nav.Item>
  );
};

export default Channel;
