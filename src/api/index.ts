import { IPokemon } from '../@types/pokemon';

interface IgetPokemons {
  limit?: number;
  offset?: number;
}

const getPokemons = async ({ limit = 51, offset = 0 }: IgetPokemons): Promise<Array<IPokemon>> => {
  const PokemonData: IPokemon[] = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
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
