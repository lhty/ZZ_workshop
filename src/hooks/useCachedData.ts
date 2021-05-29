import { useQueryClient } from 'react-query';
import { cache_names } from '../config';
import { IgetAllPokemonNames } from '../lib/getAllPokemonNames';

export const useCachedData = () => {
  const cache = useQueryClient().getQueryData([cache_names.pokemon_names]) as IgetAllPokemonNames;

  return cache;
};
