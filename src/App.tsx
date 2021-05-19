import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import { useRoutes } from 'hookrouter';
import ROUTES from './routes';

import './styles/index.scss';
import { NotFoundPage } from './pages';

const App = () => {
  const matchUrl = useRoutes(ROUTES);
  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{matchUrl}</QueryClientProvider> || <NotFoundPage />;
};

export default App;
