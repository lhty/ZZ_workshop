import React from 'react';

import { HomePage, LegendsPage, PokedexPage } from './pages';

export enum LinkEnum {
  HOME = '/',
  POKEDEX = '/pokedex',
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

const ROUTES = {
  ...MAIN_ROUTES,
};

export default ROUTES;
