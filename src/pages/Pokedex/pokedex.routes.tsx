import React from 'react';

import { IPokemonPageProps, PokemonPage } from '..';

export const POKEDEX_ROUTES: Record<string, React.FC<React.PropsWithChildren<any>>> = {
  '/:id': ({ id }: IPokemonPageProps) => <PokemonPage id={id} />,
};
