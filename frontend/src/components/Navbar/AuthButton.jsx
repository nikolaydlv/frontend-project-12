import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../hooks';

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return auth.user && <Button className="btn-primary" onClick={auth.logOut}>{t('exit')}</Button>;
};

export default AuthButton;
