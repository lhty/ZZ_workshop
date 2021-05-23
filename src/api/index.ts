import { IPokemon } from '../@types/pokemon';
import { req } from '../lib';

export interface IPokemonResults {
  count?: number;
  next?: string;
  previous?: string;
  results: Array<IPokemon>;
}

const getPokemons = async ({ limit = 50, offset = 0 }: Record<string, number>): Promise<IPokemonResults> => {
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
