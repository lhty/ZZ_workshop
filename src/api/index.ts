import { IPokemon } from '../@types/pokemon';

interface IgetPokemons {
  limit?: number;
  offset?: number;
  query?: string;
}

const getPokemons = async ({ limit = 51, offset = 0, query = '' }: IgetPokemons): Promise<Array<IPokemon>> => {
  const url = query
    ? `https://pokeapi.co/api/v2/pokemon/${query}`
    : `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const PokemonData: IPokemon[] = await fetch(url)
    .then((response) => response.json())
    .then(({ results }) => {
      const promisesArray = results.map(async ({ url }: { url: string }) => {
        const response = await fetch(url);
        const responseData = await response.json();
        return responseData;
      });
      return Promise.all(promisesArray);
    });

  return PokemonData;
};

export { getPokemons };
