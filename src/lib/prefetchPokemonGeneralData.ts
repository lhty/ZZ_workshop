import { request } from '.';
import { IPokemonUrl, Species } from '../@types/pokemon';

export interface IprefetchPokemonGeneralData {
  pokemon_count?: number;
  names: Array<IPokemonUrl>;
  types: Array<string>;
}

export const prefetchPokemonGeneralData = async (): Promise<IprefetchPokemonGeneralData> => {
  const { count } = await request('getPokemons');

  const [{ results: names }, { results: types }] = await Promise.all([
    request<{ results: IPokemonUrl[] }>('getPokemons', {
      limit: count,
    }),
    request<{ results: Species[] }>('getPokemonTypes'),
  ]);

  return { pokemon_count: count, names, types: types.map(({ name }) => name) };
};
