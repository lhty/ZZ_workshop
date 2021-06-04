import { StoreonModule } from 'storeon';
import config from '../config';

export enum pokedex_enum {
  search = 'pokedex/search',
  select_type = 'pokedex/select_type',
}

export interface IpokedexState {
  search: string;
  limit: number;
  offset: number;
  selected_types: Set<string>;
}

export interface PokedexEvents {
  [pokedex_enum.search]: string;
  [pokedex_enum.select_type]: string;
}

const InitialPokedexState: IpokedexState = {
  search: '',
  selected_types: new Set(),
  limit: config.client.settings.default_item_limit || 30,
  offset: 0,
};

export const pokedex: StoreonModule<IpokedexState, PokedexEvents> = (store) => {
  store.on('@init', () => InitialPokedexState);

  store.on(pokedex_enum.search, (_, search) => ({ search }));

  store.on(pokedex_enum.select_type, ({ selected_types }, type) => {
    if (selected_types.has(type)) {
      selected_types.delete(type);
      return { selected_types };
    }
    selected_types.add(type);
    return { selected_types };
  });
};

export const pokedex_state_fields: any[] = Object.keys(InitialPokedexState);
