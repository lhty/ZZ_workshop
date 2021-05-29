import { request } from '.';
import { IPokemon } from '../@types/pokemon';

export interface IgetAllPokemonNames {
  count?: number;
  next?: string;
  previous?: string;
  results: Array<IPokemon>;
}

export const getAllPokemonNames = async (): Promise<IgetAllPokemonNames> => {
  const { count } = await request('getPokemons');
  const results = await request<IgetAllPokemonNames>('getPokemons', {
    limit: count,
  });
  return results;
};
