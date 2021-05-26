import { useQuery } from 'react-query';
import { IPokemon } from '../@types/pokemon';
import { cache_names } from '../config';
import { getPokemonData } from '../lib';

interface IgetPokemonData {
  data?: Array<IPokemon>;
  search?: string;
  limit?: number;
  offset?: number;
}

const getSelectedPokemonData = async ({ data = [], limit = 50, offset = 0, search = '' }: IgetPokemonData) => {
  const allPokemonNames = search
    ? data?.filter(({ name }) => new RegExp(search).test(name)).slice(offset, limit)
    : data?.slice(offset, limit);

  if (search && !allPokemonNames.length) return null;

  const result = await getPokemonData<IPokemon[]>('url', allPokemonNames);
  return result;
};

export const usePokemonData = ({ data, limit, offset, search }: IgetPokemonData) => {
  return useQuery([cache_names.pokemon_data], () => getSelectedPokemonData({ data, limit, offset, search }), {
    enabled: !!data,
    keepPreviousData: true,
  });
};
