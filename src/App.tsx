import React from 'react';

import { StoreContext } from 'storeon/react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useRoutes } from 'hookrouter';
import ROUTES from './routes';

import { store } from './store';

import { cache_names } from './config';
import { prefetchPokemonGeneralData } from './lib';

import { NotFoundPage } from './pages';
import { Header } from './components';

import './styles/index.scss';

const App = () => {
  const matchUrl = useRoutes(ROUTES);
  const queryClient = React.useMemo(() => new QueryClient(), []);

  React.useEffect(() => {
    const prefetchAllPokemons = async () => {
      await queryClient.prefetchQuery(cache_names.pokemon_raw, prefetchPokemonGeneralData);
    };
    prefetchAllPokemons();
  }, [queryClient]);

  return (
    <StoreContext.Provider value={store}>
      <QueryClientProvider client={queryClient}>
        <Header />
        {matchUrl || <NotFoundPage />}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StoreContext.Provider>
  );
};

export default App;
