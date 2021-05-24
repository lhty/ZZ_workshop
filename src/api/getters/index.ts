import { IPokemon } from '../../@types/pokemon';
import { request } from '../helpers/request';
import { resolveField } from '../helpers/rosolveField';

interface IgetPokemonPage {
  count?: number;
  next?: string;
  previous?: string;
  results: Array<IPokemon>;
}

export const getPokemons = async ({ limit = 50, offset = 0 }) => {
  const { results, ...paginate_info } = await request<IgetPokemonPage, number>('getPokemons', {
    limit,
    offset,
  });
  return { results: await resolveField<IPokemon[]>('url', results), ...paginate_info };
};

export const searchPokemon = async ({ count = 1118, search = '' }) => {
  const { results: all } = await request<IgetPokemonPage, number>('getPokemons', {
    limit: count,
    offset: 0,
  });
  const regex = new RegExp(search);
  const found = all.filter(({ name }) => regex.test(name));
  return { results: await resolveField<IPokemon[]>('url', found) };
};
