import { useQuery } from 'react-query';
import { cache_names } from '../config';
import { getAllPokemonNames } from '../lib';

export const useAllPokemonNames = () => {
  return useQuery([cache_names.pokemon_names], getAllPokemonNames);
};
