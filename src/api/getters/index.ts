import { IPokemon } from '../../@types/pokemon';
import { request } from '../helpers/request';
import { resolveField } from '../helpers/rosolveField';

interface IPokemonLinks {
  count?: number;
  next?: string;
  previous?: string;
  results: Array<IPokemon>;
}

export const getAllPokemons = async () => {
  const { count } = await request('getPokemons');
  const results = await request<IPokemonLinks>('getPokemons', {
    limit: count,
  });
  return results;
};

interface IgetPokemonData {
  data?: Array<IPokemon>;
  search?: string;
  limit?: number;
  offset?: number;
  id?: number;
}

export const getPokemonData = async ({ data = [], limit = 50, offset = 0, search }: IgetPokemonData) => {
  const rawData = search
    ? data?.filter(({ name }) => new RegExp(search).test(name)).slice(offset, limit)
    : data?.slice(offset, limit);
  const result = await resolveField<IPokemon[]>('url', rawData);
  return result;
};

export const getPokemonById = async ({ id }: { id: number }) => {
  const result = await request<IPokemon>('getPokemonById', {
    id,
  });
  return result;
};
