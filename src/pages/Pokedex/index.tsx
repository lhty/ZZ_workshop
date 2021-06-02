import React from 'react';
import { useQueryParams } from 'hookrouter';

import cn from 'classnames';
import styles from './Pokedex.module.scss';

import { PokemonPage } from '..';
import { Layout, Typography, Highlight, ContentGrid, Modal } from '../../components';
import { useCachedData, useDebounce, useOnClickOutside, usePokedexData } from '../../hooks';

interface IPokedexState {
  search: string;
  limit: number;
  offset: number;
  selected_types: Set<string>;
}

const PokedexPage = () => {
  const [{ search, selected_types, limit, offset }, dispatch] = React.useReducer<
    React.Reducer<IPokedexState, Partial<IPokedexState>>
  >((prev, update) => ({ ...prev, ...update }), {
    search: '',
    selected_types: new Set(),
    limit: 30,
    offset: 0,
  });
  const [debouncedSearch, setImmediate] = useDebounce<string>(search, 500);

  const {
    query: { data, isLoading, isIdle, isError, isFetching, refetch },
    types,
  } = usePokedexData({
    limit,
    offset,
    search: debouncedSearch,
    types: selected_types,
  });

  const cache = useCachedData();

  const [{ id }] = useQueryParams();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ search: e.target.value });

  const handleAddType = (type: string) => {
    dispatch({
      selected_types: selected_types.has(type)
        ? (selected_types.delete(type), selected_types)
        : selected_types.add(type),
    });
    refetch();
  };

  return (
    <div className={styles.root}>
      {id && (
        <Modal>
          <PokemonPage id={id} />
        </Modal>
      )}
      <Layout className={styles.layerWrap}>
        <Typography className={styles.description}>
          <Highlight>
            <b> {cache?.pokemon_count || 1118} Pokemons</b>
          </Highlight>
          for you to choose your favorite
        </Typography>
        <Search {...{ search, handleSearch, setImmediate }} />
        <Filters {...{ types, selected_types, handleAddType }} />
        <ContentGrid
          {...{
            data,
            isLoading,
            isIdle,
            isError,
            isFetching,
          }}
        />
      </Layout>
    </div>
  );
};

const Search: React.FC<{
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setImmediate: (s: string) => void;
}> = ({ search, handleSearch, setImmediate }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setImmediate(search);
      }}>
      <input
        onChange={handleSearch}
        value={search}
        spellCheck="false"
        placeholder="Find your pokémon..."
        className={styles.search}
        type="text"
      />
    </form>
  );
};

const Filters: React.FC<{ types?: string[]; selected_types: Set<string>; handleAddType: (type: string) => void }> = ({
  types,
  selected_types,
  handleAddType,
}) => {
  const [toggle, setToggle] = React.useState(false);
  const ref = React.useRef(null);

  useOnClickOutside(ref, () => setToggle(false));

  return (
    <div className={styles.filters} ref={ref}>
      <button type="button" onClick={() => setToggle(!toggle)}>
        Type of pokemon
      </button>
      {toggle && (
        <div className={styles.filters_dropdown}>
          {types?.map((type) => (
            <span
              role="checkbox"
              aria-checked={selected_types.has(type)}
              tabIndex={0}
              key={type}
              className={cn({ [styles.filters_active]: selected_types.has(type) })}
              onClick={() => handleAddType(type)}
              onKeyPress={() => handleAddType(type)}>
              {type}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokedexPage;
