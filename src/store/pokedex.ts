import { StoreonModule } from 'storeon';
import config from '../config';

export enum pokedex_state_enum {
  search = 'search',
  selected_types = 'selected_types',
  selected_id = 'selected_id',
}

export interface IpokedexState {
  search: string;
  limit: number;
  offset: number;
  selected_types: Set<string>;
  selected_id: string;
}

export type PokedexEvents = Record<any, any>;

const InitialPokedexState: IpokedexState = {
  search: '',
  limit: config.client.settings.default_item_limit || 30,
  offset: 0,
  selected_types: new Set(),
  selected_id: '',
};

export const pokedex: StoreonModule<IpokedexState, PokedexEvents> = (store) => {
  store.on('@init', () => InitialPokedexState);

  store.on(pokedex_state_enum.search, (_, search) => ({ search }));

  store.on(pokedex_state_enum.selected_id, (_, selected_id) => ({ selected_id }));

  store.on(pokedex_state_enum.selected_types, ({ selected_types }, type) => {
    if (selected_types.has(type)) {
      selected_types.delete(type);
    } else {
      selected_types.add(type);
    }
    return { selected_types };
  });
};

export const pokedex_state_fields: any[] = Object.keys(InitialPokedexState);
