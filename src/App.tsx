import React from 'react';

import { ReactQueryDevtools } from 'react-query-devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useRoutes } from 'hookrouter';
import ROUTES from './routes';

import { NotFoundPage } from './pages';
import { Header } from './components';

import './styles/index.scss';

const App = () => {
  const matchUrl = useRoutes(ROUTES);
  const queryClient = new QueryClient();

  return (
    (
      <QueryClientProvider client={queryClient}>
        <Header />
        {matchUrl}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    ) || <NotFoundPage />
  );
};

export default App;
