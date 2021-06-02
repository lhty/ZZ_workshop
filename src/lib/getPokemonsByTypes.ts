import { request } from '.';
import { IPokemonUrl } from '../@types/pokemon';

type typesSlot = { pokemon: IPokemonUrl; slot: number };

export const getPokemonsByTypes = async (types: Set<string>): Promise<IPokemonUrl[]> => {
  const data: Array<{ pokemon: typesSlot[] }> = await Promise.all(
    Array.from(types).map((type) => request<{ pokemon: typesSlot[] }>('getPokemonsByType', { type })),
  );

  const result = data.reduce(
    (acc, { pokemon }) => [...acc, ...pokemon.map(({ pokemon }) => ({ name: pokemon.name, url: pokemon.url }))],
    [] as IPokemonUrl[],
  );

  return result;
};
