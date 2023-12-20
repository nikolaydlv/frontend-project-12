import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';

import { Container, Row } from 'react-bootstrap';

import getModalComponent from '../Modals';
import ChatBox from './ChatBox';

import fetchDataThunk from '../../slices/thunks';
import { useAuth, useSocket } from '../../hooks';
import { selectors as modalsSelectors } from '../../slices/modalSlice';

const ChatPage = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const modalType = useSelector(modalsSelectors.selectModalType);
  const { getAuthHeader } = useAuth();
  const authHeaders = useMemo(() => ({ headers: getAuthHeader() }), [getAuthHeader]);

  useEffect(() => {
    dispatch(fetchDataThunk(authHeaders));
    socket.connectSocket();

    return () => socket.disconnectSocket();
  }, [dispatch, socket, authHeaders]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChatBox />
      </Row>
      {getModalComponent(modalType)}
    </Container>
  );
};

export default ChatPage;
