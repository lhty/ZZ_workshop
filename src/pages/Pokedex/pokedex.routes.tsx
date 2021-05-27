import React from 'react';

import { navigate } from 'hookrouter';
import { LinkEnum } from '../../routes';

import { PokemonPage } from '..';
import { Modal } from '../../components';

export const POKEDEX_ROUTES: Record<string, React.FC<React.PropsWithChildren<any>>> = {
  '/:id': ({ id }: { id: number }) => (
    <Modal id="pokemon_card" onClose={() => navigate(LinkEnum.POKEDEX)}>
      <PokemonPage id={id} />
    </Modal>
  ),
};
