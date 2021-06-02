import { useQuery, UseQueryResult } from 'react-query';
import { IPokemon, IPokemonUrl } from '../@types/pokemon';
import { cache_names } from '../config';
import { prefetchPokemonGeneralData, getPokemonData, getPokemonsByTypes } from '../lib';

interface IusePokedexData {
  search?: string;
  limit: number;
  offset: number;
  types?: Set<string>;
}

type PokemonDataReturnType = UseQueryResult<IPokemon[], Error>;

type usePokedexDataRetunType = { query: PokemonDataReturnType; types?: string[] };

export const usePokedexData = ({ limit, offset, search, types }: IusePokedexData): usePokedexDataRetunType => {
  const { data } = useQuery([cache_names.pokemon_raw], prefetchPokemonGeneralData, {
    keepPreviousData: true,
  });

  return {
    query: useQuery(
      [cache_names.pokemon_data, { search, limit, offset, types }],
      () => getPokedexData({ data: data?.names, limit, offset, search, types }),
      {
        enabled: !!data || !!types?.size,
        keepPreviousData: true,
      },
    ),
    types: data?.types,
  };
};

interface IgetPokedexData extends IusePokedexData {
  data?: IPokemonUrl[];
}

const getPokedexData = async ({
  data,
  limit,
  offset,
  search,
  types,
}: IgetPokedexData): Promise<IPokemon | IPokemon[]> => {
  if (types?.size) {
    data = await getPokemonsByTypes(types);
  }

  if (search) {
    data = data?.filter(({ name }) => new RegExp(search).test(name));
  }

  data = data?.slice(offset, offset + limit);

  const result = await getPokemonData<IPokemonUrl | IPokemonUrl[]>('url', data);
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
