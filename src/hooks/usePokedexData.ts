import { useQuery, UseQueryResult } from 'react-query';
import { IPokemon } from '../@types/pokemon';
import { cache_names } from '../config';
import { getAllPokemonNames, getPokemonData } from '../lib';

interface IusePokedexData {
  search?: string;
  limit: number;
  offset: number;
}

export const usePokedexData = ({ limit, offset, search }: IusePokedexData): UseQueryResult<IPokemon[], Error> => {
  const { data } = useQuery([cache_names.pokemon_names], getAllPokemonNames, {
    keepPreviousData: true,
  });

  return useQuery(
    [cache_names.pokemon_data, { search, limit, offset }],
    () => getPokedexData({ data: data?.results, limit, offset, search }),
    {
      enabled: !!data,
      keepPreviousData: true,
    },
  );
};

interface IgetPokedexData extends IusePokedexData {
  data?: IPokemon[];
}

const getPokedexData = async ({ data, limit, offset, search }: IgetPokedexData) => {
  if (search) {
    data = data?.filter(({ name }) => new RegExp(search).test(name));
  }

  data = data?.slice(offset, offset + limit);

  const result = await getPokemonData<IPokemon | IPokemon[]>('url', data);
  return result;
};

// return useTypedQueries([
//   {
//     queryKey: [cache_names.pokemon_data, { limit, offset, search }],
//     queryFn: () => getSelectedPokemonData({ data, search, id }),
//     ...{
//       enabled: !!data,
//       // keepPreviousData: true,
//     },
//   },
//   {
//     queryKey: [cache_names.pokemon, { id }],
//     queryFn: () => getSelectedPokemonData({ id }),
//     ...{
//       enabled: !!id,
//       keepPreviousData: true,
//     },
//   },
// ]);

// /* Issue #1675 */
// const useTypedQueries = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData>(
//   queries: UseQueryOptions<TQueryFnData, TError, TData>[],
// ) => useQueries(queries as UseQueryOptions<unknown, unknown, unknown>[]) as QueryObserverResult<TQueryFnData, TError>[];
