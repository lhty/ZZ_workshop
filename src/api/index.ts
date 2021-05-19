import { IPokemon } from '../@types/pokemon';

const getPokemons = async (): Promise<Array<IPokemon>> => {
  const PokemonData: IPokemon[] = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=33`)
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
