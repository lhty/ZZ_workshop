import React from 'react';

import { Modal } from './components';
import { HomePage, LegendsPage, PokedexPage, PokemonPage } from './pages';

export enum LinkEnum {
  HOME = '/',
  POKEDEX = '/pokedex',
  POKEMON = '/pokedex/:id',
  LEGENDARIES = '/legendaries',
  DOCUMENTATION = '/documentation',
}

type componentType = React.FC<React.PropsWithChildren<any>>;

export const MAIN_MENU = [
  { title: 'Home', link: LinkEnum.HOME, component: () => <HomePage /> },
  { title: 'Pokédex', link: LinkEnum.POKEDEX, component: () => <PokedexPage /> },
  { title: 'Legendaries', link: LinkEnum.LEGENDARIES, component: () => <LegendsPage /> },
  { title: 'Documentation', link: LinkEnum.DOCUMENTATION, component: () => <HomePage /> },
];

const MAIN_ROUTES: Record<string, componentType> = MAIN_MENU.reduce((acc, { link, component }) => {
  acc[link] = component;
  return acc;
}, {});

const MODAL_ROUTES: Record<string, componentType> = {
  [LinkEnum.POKEMON]: ({ id }: { id: number }) => (
    <Modal>
      <PokemonPage id={id} />
    </Modal>
  ),
};

const ROUTES = {
  ...MAIN_ROUTES,
  ...MODAL_ROUTES,
};

export default ROUTES;
