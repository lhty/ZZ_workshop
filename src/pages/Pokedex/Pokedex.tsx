import React from 'react';

import { A } from 'hookrouter';

import { Card, Highlight, Layout, Typography } from '../../components';
import { range } from '../../lib';

import { IPokemon } from '../../@types/pokemon';
import { useCachedData, useDebounce, usePokemonData } from '../../hooks';

import styles from './Pokedex.module.scss';

interface IPokedexState {
  search: string;
  limit: number;
  offset: number;
}

const Pokedex = () => {
  const [{ search, limit, offset }, dispatch] = React.useReducer<React.Reducer<IPokedexState, Partial<IPokedexState>>>(
    (prev, update) => ({ ...prev, ...update }),
    {
      search: '',
      limit: 30,
      offset: 0,
    },
  );
  const [debouncedSearch, setImmediate] = useDebounce<string>(search, 500);
  const { data: pokemon_data, isLoading, isIdle, isError } = usePokemonData({ limit, offset, search: debouncedSearch });
  const cache = useCachedData();

  return (
    <div className={styles.root}>
      <Layout className={styles.layerWrap}>
        <Typography className={styles.description}>
          <Highlight>
            <b> {cache?.count || 1118} Pokemons</b>
          </Highlight>
          for you to choose your favorite
        </Typography>
        <Search {...{ search, dispatch, setImmediate }} />
        <CheckBox />
        <ContentGrid
          {...{
            isLoading,
            isError,
            isIdle,
            limit,
            offset,
            pokemon_data: pokemon_data?.slice(offset, offset + limit),
            empty: range(0, limit),
          }}
        />
      </Layout>
    </div>
  );
};

interface IContentGrid {
  isLoading: boolean;
  isError: boolean;
  isIdle: boolean;
  pokemon_data?: IPokemon[];
  empty?: number[];
}

const ContentGrid: React.FC<IContentGrid> = ({ isLoading, isError, isIdle, pokemon_data, empty }) => {
  if (isError) {
    return <Typography className={styles.description}>Something went wrong</Typography>;
  }

  if (!isIdle && !pokemon_data?.length && !isLoading) {
    return <Typography className={styles.description}>Nothing found :(</Typography>;
  }

  return (
    <div className={styles.contentWrap}>
      {pokemon_data
        ? pokemon_data.map((pokemon) => (
            <A key={pokemon.id} href={`pokedex/${pokemon.id}`}>
              <Card {...pokemon} />
            </A>
          ))
        : empty?.map((skeleton) => <Card key={skeleton} />)}
    </div>
  );
};

const Search: React.FC<{
  search: string;
  dispatch: React.Dispatch<Partial<IPokedexState>>;
  setImmediate: (s: string) => void;
}> = ({ search, dispatch, setImmediate }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setImmediate(search);
      }}>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch({ search: e.target.value })}
        value={search}
        spellCheck="false"
        placeholder="Find your pokémon..."
        className={styles.search}
        type="text"
      />
    </form>
  );
};

const CheckBox: React.FC = () => {
  return (
    <div className={styles.filters}>
      <select id="whatever">
        <option value="fire">Fire</option>
        <option value="normal">Normal</option>
        <option value="electric">Electric</option>
        <option value="water">Water</option>
      </select>
    </div>
  );
};

export default Pokedex;
