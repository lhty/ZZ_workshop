import React from 'react';
import { HomePage, Pokedex } from './pages';

export enum LinkEnum {
  HOME = '/',
  POKEDEX = '/pokedex',
  LEGENDARIES = '/legendaries',
  DOCUMENTATION = '/documentation',
}

interface IMenuItem {
  title: string;
  link: LinkEnum;
  component: React.FC;
}

interface IRoutes {
  [key: string]: React.FC;
}

export const MAIN_MENU: IMenuItem[] = [
  { title: 'Home', link: LinkEnum.HOME, component: () => <HomePage /> },
  { title: 'Pokédex', link: LinkEnum.POKEDEX, component: () => <Pokedex /> },
  { title: 'Legendaries', link: LinkEnum.LEGENDARIES, component: () => <HomePage /> },
  { title: 'Documentation', link: LinkEnum.DOCUMENTATION, component: () => <HomePage /> },
];

const ROUTES = MAIN_MENU.reduce((acc, { link, component }) => {
  acc[link] = component;
  return acc;
}, {} as IRoutes);

export default ROUTES;
