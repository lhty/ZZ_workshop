import React from 'react';

import { Layout, Typography, Highlight, ContentGrid } from '../../components';
import { useCachedData, useDebounce } from '../../hooks';

import styles from './Pokedex.module.scss';

interface IPokedexState {
  search: string;
  limit: number;
  offset: number;
}

const PokedexPage = () => {
  const [{ search, limit, offset }, dispatch] = React.useReducer<React.Reducer<IPokedexState, Partial<IPokedexState>>>(
    (prev, update) => ({ ...prev, ...update }),
    {
      search: '',
      limit: 30,
      offset: 0,
    },
  );
  const [debouncedSearch, setImmediate] = useDebounce<string>(search, 500);

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
        <Filters />
        <ContentGrid
          {...{
            limit,
            offset,
            search: debouncedSearch,
          }}
        />
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

const Filters: React.FC = () => {
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

export default PokedexPage;
