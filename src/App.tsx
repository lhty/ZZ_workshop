import React from 'react';

import { ReactQueryDevtools } from 'react-query-devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useRoutes } from 'hookrouter';
import ROUTES from './routes';

import { cache_names } from './config';
import { getAllPokemonNames } from './lib';

import { NotFoundPage } from './pages';
import { Header } from './components';

import './styles/index.scss';

const App = () => {
  const matchUrl = useRoutes(ROUTES);
  const queryClient = React.useMemo(() => new QueryClient(), []);

  React.useLayoutEffect(() => {
    const prefetchAllPokemons = async () => {
      await queryClient.prefetchQuery(cache_names.pokemon_names, getAllPokemonNames);
    };
    prefetchAllPokemons();
  }, [queryClient]);

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
