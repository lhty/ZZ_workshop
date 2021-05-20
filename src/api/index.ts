import { IPokemon } from '../@types/pokemon';
import { req } from '../lib';

export interface IPokemonResults {
  count?: number;
  next?: string;
  previous?: string;
  results: Array<IPokemon>;
}

type getPokemonsFnType = (params: { limit?: number; offset?: number }) => Promise<IPokemonResults>;

const getPokemons: getPokemonsFnType = async ({ limit = 50, offset = 0 }) => {
  // const data = await fetch(`${URL}?limit=${limit}&offset=${offset}`);

  const { results, ...paginate_info } = await req('getPokemons', { limit, offset });

  const detailedResultsData = await Promise.all(
    results.map(async ({ url }: { url: string }) => {
      const response = await fetch(url);
      const responseData = await response.json();
      return responseData;
    }),
  );

  return { results: detailedResultsData, ...paginate_info };
};

export { getPokemons };
