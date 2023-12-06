const root = '';
const apiPath = 'api/v1';

export default {
  signupPagePath: () => [root, 'signup'].join('/'),
  loginPagePath: () => [root, 'login'].join('/'),
  chatPagePath: () => [root, ''].join('/'),
  notFoundPath: () => [root, '*'].join('/'),

  signupPath: () => [root, apiPath, 'signup'].join('/'),
  loginPath: () => [root, apiPath, 'login'].join('/'),
  dataPath: () => [root, apiPath, 'data'].join('/'),
};
