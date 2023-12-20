import { Container, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AuthButton from './AuthButton';

import { appPaths } from '../../routes';

const ChatNavbar = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to={appPaths.chat}>{t('name')}</Navbar.Brand>
          <AuthButton />
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default ChatNavbar;
