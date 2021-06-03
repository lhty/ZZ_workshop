import { useQuery } from 'react-query';
import { IPokemon } from '../@types/pokemon';

import { cache_names } from '../config';
import { request } from '../lib';

export const usePokemonData = (id: number) => {
  return useQuery([cache_names.pokemon, id], () => getPokemonData(id), {
    enabled: !!id,
    keepPreviousData: true,
  });
};

const getPokemonData = async (id: number) => {
  const result = await request<IPokemon>('getPokemonById', { id });
  return result;
};
