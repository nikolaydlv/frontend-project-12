const root = '';
const apiPath = 'api/v1';

export default {
  chatPagePath: () => [root, ''].join('/'),
  loginPagePath: () => [root, 'login'].join('/'),
  dataPath: () => [root, apiPath, 'data'].join('/'),
  loginPath: () => [root, apiPath, 'login'].join('/'),
  signupPath: () => [root, apiPath, 'signup'].join('/'),
};
