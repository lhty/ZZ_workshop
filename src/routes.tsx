import { navigate } from 'hookrouter';
import React from 'react';
import { Modal } from './components';
import { HomePage, LegendsPage, Pokedex, PokemonPage, IPokemonPageProps } from './pages';

export enum LinkEnum {
  HOME = '/',
  POKEDEX = '/pokedex',
  POKEMON = '/pokedex/:id',
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
  { title: 'Pokédex', link: LinkEnum.POKEDEX, component: () => <Pokedex /> },
  { title: 'Legendaries', link: LinkEnum.LEGENDARIES, component: () => <LegendsPage /> },
  { title: 'Documentation', link: LinkEnum.DOCUMENTATION, component: () => <HomePage /> },
];

export const NESTED_ROUTES: IMenuItem[] = [
  {
    title: 'Pokemon',
    link: LinkEnum.POKEMON,
    component: ({ id }: IPokemonPageProps) => (
      <Modal id="pokemon" onClose={() => navigate(LinkEnum.POKEDEX)}>
        <PokemonPage id={id} />
      </Modal>
    ),
  },
];

const ROUTES = [...MAIN_MENU, ...NESTED_ROUTES].reduce((acc, { link, component }) => {
  acc[link] = component;
  return acc;
}, {} as Record<string, React.FC>);

export default ROUTES;
