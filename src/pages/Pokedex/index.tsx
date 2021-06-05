import React from 'react';

import { useStoreon } from 'storeon/react';
import { IpokedexState, PokedexEvents, pokedex_state_enum, pokedex_state_fields } from '../../store/pokedex';

import styles from './Pokedex.module.scss';

import { PokemonPage } from '..';
import { Layout, Typography, Highlight, ContentGrid, Modal, Search, Filters } from '../../components';
import { useDebounce, usePokedexData } from '../../hooks';

const PokedexPage = () => {
  const { search, limit, offset, selected_types, dispatch } = useStoreon<IpokedexState, PokedexEvents>(
    ...pokedex_state_fields,
  );
  const [debounced_search] = useDebounce(search, 500);
  const {
    query: { data, isLoading, isIdle, isError, isFetching },
    overall_count,
    types,
  } = usePokedexData({
    limit,
    offset,
    search: debounced_search,
    types: selected_types,
  });

  const handleAddType = (type: string) => dispatch(pokedex_state_enum.select_type, type);

  return (
    <main className={styles.root}>
      <Modal>
        <PokemonPage />
      </Modal>
      <Layout className={styles.layerWrap}>
        <Typography className={styles.description}>
          <Highlight>{overall_count} Pokemons</Highlight>
          for you to choose your favorite
        </Typography>
        <Search />
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
    </main>
  );
};

export default PokedexPage;
