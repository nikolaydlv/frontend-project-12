import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFoundImg from '../assets/404.svg';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img src={notFoundImg} alt={t('pageNotFound')} className="img-fluid h-25" />
      <h1 className="h4 text-muted">{t('pageNotFound')}</h1>
      <p className="text-muted">
        {t('redirect')}
        <Link to="/">{t('mainPage')}</Link>
      </p>
    </div>
  );
};

export default NotFound;
