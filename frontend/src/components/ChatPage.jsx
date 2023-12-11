/* eslint-disable functional/no-expression-statements */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import fetchData from '../slices/fetchData.js';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

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
