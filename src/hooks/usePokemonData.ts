import { useQueries, useQuery } from 'react-query';
import { IPokemon } from '../@types/pokemon';
import { cache_names } from '../config';
import { getAllPokemonNames, getPokemonData, request } from '../lib';

interface IPokemonData {
  search?: string;
  limit?: number;
  offset?: number;
  id?: number;
}

interface ISelectedPokemonData extends Partial<IPokemonData> {
  data?: IPokemon[];
}

export const usePokemonData = ({ limit = 30, offset = 0, search, id }: IPokemonData) => {
  const { data: allPokemons } = useQuery([cache_names.pokemon_names], getAllPokemonNames);
  const data = allPokemons?.results.slice(offset, offset + limit);

  // return useQuery(
  //   [cache_names.pokemon_data, { id, search, limit, offset }],
  //   () => getSelectedPokemonData({ data, search, id }),
  //   {
  //     enabled: !!data,
  //     keepPreviousData: true,
  //   },
  // );
  return useQueries(
    data?.map(({ id }) => {
      return {
        queryKey: ['pokemon', id],
        queryFn: () => getSelectedPokemonData({ id }),
      };
    }),
  );
};

const getSelectedPokemonData = async ({ data, search, id }: ISelectedPokemonData) => {
  if (search && !data) return null;

  if (id) {
    const result = await request('getPokemonById', { id });
    return result;
  }

  if (Array.isArray(data) && search) {
    const found = data?.filter(({ name }) => new RegExp(search).test(name));
    const results = await getPokemonData<IPokemon[]>('url', found);
    return results;
  }
  const result = await getPokemonData<IPokemon | IPokemon[]>('url', data);
  return result;
};
