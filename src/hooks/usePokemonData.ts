import { useQuery } from 'react-query';
import { IPokemon } from '../@types/pokemon';
import { cache_names } from '../config';
import { getAllPokemonNames, getPokemonData, request } from '../lib';

interface IPokemonData {
  search?: string;
  limit?: number;
  offset?: number;
  id?: number;
}

interface ISelectedPokemonData extends IPokemonData {
  data?: IPokemon[];
}

export const usePokemonData = ({ limit, offset, search, id }: IPokemonData) => {
  const { data } = useQuery([cache_names.pokemon_names], getAllPokemonNames);

  return useQuery(
    [cache_names.pokemon_data, id],
    () => getSelectedPokemonData({ data: data?.results, limit, offset, search, id }),
    {
      enabled: !!data,
      keepPreviousData: true,
    },
  );
};

const getSelectedPokemonData = async ({ data, limit = 50, offset = 0, search = '', id }: ISelectedPokemonData) => {
  if (search && !data) return null;

  if (id) {
    const result = await request('getPokemonById', { id });
    return result;
  }

  if (Array.isArray(data)) {
    const allPokemonNames = search
      ? data?.filter(({ name }) => new RegExp(search).test(name)).slice(offset, limit)
      : data?.slice(offset, limit);

    const results = await getPokemonData<IPokemon[]>('url', allPokemonNames);
    return results;
  }
  const result = await getPokemonData<IPokemon>('url', data);
  return result;
};
