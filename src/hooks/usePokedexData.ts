import { useQuery, UseQueryResult } from 'react-query';
import { IPokemon, IPokemonUrl } from '../@types/pokemon';
import { cache_names } from '../config';
import { prefetchPokemonGeneralData, getPokemonData, getPokemonsByTypes } from '../lib';

interface IusePokedexData {
  search?: string;
  limit: number;
  offset: number;
  selected_types?: Set<string>;
}

type PokemonDataReturnType = UseQueryResult<IPokemon[], Error>;

type usePokedexDataRetunType = { query: PokemonDataReturnType; available_types?: string[]; overall_count?: number };

export const usePokedexData = ({ limit, offset, search, selected_types }: IusePokedexData): usePokedexDataRetunType => {
  const { data } = useQuery([cache_names.pokemon_raw], prefetchPokemonGeneralData, {
    keepPreviousData: true,
  });

  return {
    query: useQuery(
      [
        cache_names.pokemon_data,
        { search, limit, offset, selected_types: selected_types && Array.from(selected_types.values()) },
      ],
      () => getPokedexData({ data: data?.names, limit, offset, search, selected_types }),
      {
        enabled: !!data,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    ),
    overall_count: data?.pokemon_count,
    available_types: data?.types,
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
  selected_types,
}: IgetPokedexData): Promise<IPokemon | IPokemon[]> => {
  if (selected_types?.size) {
    data = await getPokemonsByTypes(selected_types);
  }

  if (search) {
    data = data?.filter(({ name }) => new RegExp(search).test(name));
  }

  data = data?.slice(offset, offset + limit);

  const result = await getPokemonData<IPokemonUrl | IPokemonUrl[]>('url', data);
  return result;
};
