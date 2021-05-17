import React from 'react';

import { useRoutes } from 'hookrouter';
import ROUTES from './routes';

import './styles/index.css';
import { NotFoundPage } from './pages';

const App = () => {
  const matchUrl = useRoutes(ROUTES);

  return matchUrl || <NotFoundPage />;
};

export default App;
