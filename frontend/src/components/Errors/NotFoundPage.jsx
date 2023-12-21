import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { appPaths } from '../../routes';

import error from '../../assets/404.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Image width="30%" height="30%" alt={t('pageNotFound')} src={error} fluid />
      <h1 className="h4 text-muted">{t('pageNotFound')}</h1>
      <p className="text-muted">
        {t('redirect')}
        {' '}
        <Link to={appPaths.chat}>{t('mainPage')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
