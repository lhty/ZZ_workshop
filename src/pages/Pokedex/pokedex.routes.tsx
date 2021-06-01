import React from 'react';

import { PokemonPage } from '..';
import { Modal } from '../../components';

export const POKEDEX_ROUTES: Record<string, React.FC<React.PropsWithChildren<any>>> = {
  '/:id': ({ id }: { id: number }) => (
    <Modal>
      <PokemonPage id={id} />
    </Modal>
  ),
};
