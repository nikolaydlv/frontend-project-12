import ReactDOM from 'react-dom/client';
import './styles/index.scss';

import init from './init';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));

  root.render(await init());
};

app();
