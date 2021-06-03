import { useQueryClient } from 'react-query';
import { cache_names } from '../config';
import { IprefetchPokemonGeneralData } from '../lib/prefetchPokemonGeneralData';

export const useCachedData = () => {
  const cache = useQueryClient().getQueryData([cache_names.pokemon_raw]) as IprefetchPokemonGeneralData;

  return cache;
};
