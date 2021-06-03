import { StoreonModule } from 'storeon';

export enum pokedex_action_enum {
  init = '@init',
  search = 'pokedex/search',
}

interface Ipokedex {
  search: string;
  limit: number;
  offset: number;
  selected_types: Set<string>;
}

export const pokedex: StoreonModule<Ipokedex> = (store) => {
  store.on(pokedex_action_enum.init, () => ({
    search: '',
    selected_types: new Set(),
    limit: 30,
    offset: 0,
  }));

  store.on(pokedex_action_enum.search, (state, search) => {
    return { ...state, search };
  });
};
