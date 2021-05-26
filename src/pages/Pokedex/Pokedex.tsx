/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React from 'react';

import { Card, Highlight, Layout, Typography } from '../../components';
import { range } from '../../lib';

import { IPokemon } from '../../@types/pokemon';
import { useAllPokemonNames, useDebounce, usePokemonData } from '../../hooks';

import styles from './Pokedex.module.scss';

interface IPokedexState {
  search: string;
  limit: number;
  offset: number;
  selectedId?: number;
}

const Pokedex = () => {
  const [{ search, limit, offset, selectedId }, dispatch] = React.useReducer<
    React.Reducer<IPokedexState, Partial<IPokedexState>>
  >((prev, update) => ({ ...prev, ...update }), {
    search: '',
    limit: 50,
    offset: 0,
    selectedId: undefined,
  });
  const [debouncedSearch, setImmediate] = useDebounce<string>(search, 500);
  const { data: pokemon_names } = useAllPokemonNames();
  const {
    data: pokemon_data,
    isFetching,
    isError,
    refetch,
  } = usePokemonData({ data: pokemon_names?.results, limit, offset, search: debouncedSearch });

  React.useEffect(() => {
    refetch();
  }, [debouncedSearch, refetch]);

  return (
    <div className={styles.root}>
      <Layout className={styles.layerWrap}>
        <Typography className={styles.description}>
          800
          <Highlight>
            <b>Pokemons</b>
          </Highlight>
          for you to choose your favorite
        </Typography>
        <Search {...{ search, dispatch, setImmediate }} />
        <CheckBox />
        <ContentGrid {...{ isError, isFetching, limit, offset, pokemon_data }} />
      </Layout>
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

const ContentGrid: React.FC<{
  isError: boolean;
  isFetching: boolean;
  limit: number;
  offset: number;
  pokemon_data?: Array<IPokemon> | null;
}> = ({ isFetching, isError, pokemon_data, limit, offset }) => {
  if (isError) {
    return <Typography className={styles.description}>Something went wrong</Typography>;
  }

  if (!pokemon_data) {
    return <Typography className={styles.description}>Nothing found :(</Typography>;
  }

  return (
    <div className={styles.contentWrap}>
      {isFetching
        ? range(0, limit).map((id) => <Card key={id} />)
        : pokemon_data?.map(
            ({ id, ...rest }, idx) => idx >= offset && idx <= limit && <Card key={id} {...{ id, ...rest }} />,
          )}
    </div>
  );
};

export default Pokedex;
