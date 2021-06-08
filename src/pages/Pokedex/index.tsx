import React from 'react';

import { useStoreon } from 'storeon/react';
import { IpokedexState, PokedexEvents, pokedex_state_fields, pokedex_state_enum } from '../../store/pokedex';

import styles from './Pokedex.module.scss';

import { PokemonPage } from '..';
import { Layout, Typography, Highlight, ContentGrid, Modal, Search, Filters } from '../../components';
import { useDebounce, usePokedexData } from '../../hooks';

const PokedexPage = () => {
  const { search, limit, offset, selected_types, selected_id, dispatch } = useStoreon<IpokedexState, PokedexEvents>(
    ...pokedex_state_fields,
  );
  const [debounced_search] = useDebounce(search, 500);
  const {
    query: { data, isLoading, isIdle, isError, isFetching },
    overall_count,
    available_types,
  } = usePokedexData({
    limit,
    offset,
    search: debounced_search,
    selected_types,
  });
  const handleAddType = (e: React.MouseEvent | React.KeyboardEvent<HTMLElement>) => {
    e.stopPropagation();
    const { type, id } = (e.target as HTMLInputElement).dataset;
    if (id) {
      dispatch(pokedex_state_enum.selected_id, id);
    }
    if (!id && type) {
      dispatch(pokedex_state_enum.selected_types, type);
    }
  };

  const handleModalControls = React.useMemo(
    () => ({
      onClose() {
        dispatch(pokedex_state_enum.selected_id, '');
      },
      onNext() {
        dispatch(pokedex_state_enum.selected_id, Number(selected_id) + 1);
      },
      onPrev() {
        dispatch(pokedex_state_enum.selected_id, Math.max(1, Number(selected_id) - 1));
      },
    }),
    [selected_id, dispatch],
  );
  return (
    <main role="presentation" onClick={handleAddType} onKeyPress={handleAddType} className={styles.root}>
      <Modal {...{ isOpen: !!selected_id, controls: handleModalControls }}>
        <PokemonPage />
      </Modal>
      <Layout className={styles.layerWrap}>
        <Typography className={styles.description}>
          <Highlight>
            <b>{overall_count} Pokemons</b>
          </Highlight>
          for you to choose your favorite
        </Typography>
        <Search />
        <Filters {...{ available_types }} />
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
