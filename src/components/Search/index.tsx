import React from 'react';
import { useStoreon } from 'storeon/react';
import { IpokedexState, PokedexEvents, pokedex_state_enum } from '../../store/pokedex';

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const { search, dispatch } = useStoreon<IpokedexState, PokedexEvents>(pokedex_state_enum.search);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(pokedex_state_enum.search, e.target.value);

  return (
    <input
      onChange={handleSearch}
      value={search}
      spellCheck={false}
      placeholder="Find your pokémon..."
      className={styles.search}
      type="text"
    />
  );
};

export default Search;
