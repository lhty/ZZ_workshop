import React from 'react';

import { useRoutes, navigate } from 'hookrouter';
import { LinkEnum } from '../../routes';

import Pokedex from './Pokedex';
import { Modal } from '../../components';
import { IPokemonPageProps, PokemonPage } from '..';

const POKEDEX_ROUTES: Record<string, React.FC<React.PropsWithChildren<any>>> = {
  '/:id': ({ id }: IPokemonPageProps) => (
    <Modal id="pokemon" onClose={() => navigate(LinkEnum.POKEDEX)}>
      <PokemonPage id={id} />
    </Modal>
  ),
};

const PokedexPage = () => {
  const routeResult = useRoutes(POKEDEX_ROUTES);
  return (
    <>
      <Pokedex />
      {routeResult}
    </>
  );
};

export default PokedexPage;
