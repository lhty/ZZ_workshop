import React from 'react';

import { useRoutes } from 'hookrouter';

import Pokedex from './Pokedex';
import { POKEDEX_ROUTES } from './pokedex.routes';

const PokedexPage = React.memo(() => {
  const routeResult = useRoutes(POKEDEX_ROUTES);

  return (
    <>
      <Pokedex />
      {routeResult}
    </>
  );
});

export default PokedexPage;
