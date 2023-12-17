import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import fetchData from '../slices/fetchData';

import Channels from './Channels';
import Messages from './Messages';

const ChatPage = () => {
  const { token } = JSON.parse(localStorage.getItem('userdata'));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(token));
  }, [dispatch, token]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default ChatPage;
