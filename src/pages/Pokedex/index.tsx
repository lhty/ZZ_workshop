import React from 'react';
import { setQueryParams, useQueryParams } from 'hookrouter';

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
type PokedexReducerType = React.Reducer<IPokedexState, Partial<IPokedexState>>;

const PokedexPage = () => {
  const [query_params] = useQueryParams();
  const [{ search, selected_types, limit, offset }, dispatch] = React.useReducer<PokedexReducerType>(
    (prev, update) => ({ ...prev, ...update }),
    {
      search: '',
      selected_types: new Set(),
      limit: 30,
      offset: 0,
    },
  );
  const [debounced_search, setImmediate] = useDebounce<string>(search, 500);

  const {
    query: { data, isLoading, isIdle, isError, isFetching, refetch },
    types,
  } = usePokedexData({
    limit,
    offset,
    search: debounced_search,
    types: selected_types,
  });
  const cache = useCachedData();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ search: e.target.value });

  const handleAddType = React.useCallback((_type: string) => {
    dispatch({
      selected_types: selected_types.has(_type)
        ? (selected_types.delete(_type), selected_types)
        : selected_types.add(_type),
    });
    refetch();
  }, []);

  const modalControls = React.useMemo(
    () => ({
      onClose() {
        delete query_params.id;
        setQueryParams(query_params);
      },
      onNext() {
        setQueryParams({ id: Number(query_params.id) + 1 });
      },
      onPrev() {
        setQueryParams({ id: Math.max(1, Number(query_params.id) - 1) });
      },
    }),
    [],
  );

  return (
    <div className={styles.root}>
      <Modal isVisible={!!query_params.id} {...modalControls}>
        <PokemonPage id={query_params.id} />
      </Modal>
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

interface IFilters {
  types?: string[];
  selected_types: Set<string>;
  handleAddType: (type: string) => void;
}

const Filters: React.FC<IFilters> = ({ types, selected_types, handleAddType }) => {
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
            <div
              role="menuitemradio"
              aria-checked={selected_types.has(type)}
              tabIndex={0}
              key={type}
              onClick={() => handleAddType(type)}
              onKeyPress={() => handleAddType(type)}>
              <input
                tabIndex={-1}
                id="checkbox"
                type="checkbox"
                checked={selected_types.has(type)}
                onChange={() => handleAddType(type)}
              />
              {type}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokedexPage;
