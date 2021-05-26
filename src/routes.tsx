import React from 'react';

import { HomePage, LegendsPage, PokedexPage } from './pages';

export enum LinkEnum {
  HOME = '/',
  POKEDEX = '/pokedex*',
  LEGENDARIES = '/legendaries',
  DOCUMENTATION = '/documentation',
}

interface IMenuItem {
  title: string;
  link: LinkEnum;
  component: React.FC<React.PropsWithChildren<any>>;
}

export const MAIN_MENU: IMenuItem[] = [
  { title: 'Home', link: LinkEnum.HOME, component: () => <HomePage /> },
  { title: 'Pokédex', link: LinkEnum.POKEDEX, component: () => <PokedexPage /> },
  { title: 'Legendaries', link: LinkEnum.LEGENDARIES, component: () => <LegendsPage /> },
  { title: 'Documentation', link: LinkEnum.DOCUMENTATION, component: () => <HomePage /> },
];

const ROUTES = MAIN_MENU.reduce((acc, { link, component }) => {
  acc[link] = component;
  return acc;
}, {} as Record<string, React.FC>);

export default ROUTES;
