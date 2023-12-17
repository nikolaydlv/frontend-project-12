export default {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  enabled: process.env.NODE_ENV === 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
};
