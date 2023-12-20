import { io } from 'socket.io-client';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary as ErrorBoundaryProvider } from '@rollbar/react';

import App from './components/App';
import AuthProvider from './contexts/AuthProvider';
import SocketProvider from './contexts/SocketProvider';
import FilterProvider from './contexts/FilterProvider';
import resources from './locales';
import store from './slices';
import rollbarConfig from './configs/rollbarConfig';

const init = async () => {
  const websocket = io();

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({ resources, fallbackLng: 'ru' });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundaryProvider>
        <StoreProvider store={store}>
          <SocketProvider socket={websocket}>
            <AuthProvider>
              <FilterProvider>
                <I18nextProvider i18n={i18n}>
                  <App />
                </I18nextProvider>
              </FilterProvider>
            </AuthProvider>
          </SocketProvider>
        </StoreProvider>
      </ErrorBoundaryProvider>
    </RollbarProvider>
  );
};

export default init;
