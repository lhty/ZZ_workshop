/* eslint-disable no-console */
import React from 'react';

import { useQuery } from 'react-query';

import { getPokemons, searchPokemon } from '../../api/getters';
import { IPokemon } from '../../@types/pokemon';

import { Card, Highlight, Layout, Typography } from '../../components';
import { range } from '../../lib';

import styles from './Pokedex.module.scss';
import { useDebounce } from '../../hooks';

const [limit, offset] = [50, 0];

const Pokedex = () => {
  const [_search, setSearch] = React.useState('');
  const search = useDebounce(_search, 500);
  const { data, isLoading, isError, refetch } = useQuery(['pokemons'], () => getPokemons({ limit, offset }), {
    keepPreviousData: true,
  });
  const { data: found } = useQuery(['pokemons', search], () => searchPokemon({ count: data?.count, search }), {
    enabled: !!data?.count && !!search,
    keepPreviousData: true,
  });

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            refetch();
          }}>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            value={_search}
            placeholder="Find your pokémon..."
            className={styles.search}
            type="text"
          />
        </form>
        <div className={styles.filters}>
          <select id="whatever">
            <option value="fire">Fire</option>
            <option value="normal">Normal</option>
            <option value="electric">Electric</option>
            <option value="water">Water</option>
          </select>
        </div>
        <div className={styles.contentWrap}>
          <ContentGrid {...{ isLoading, isError, data: found?.results.length ? found.results : data?.results }} />
        </div>
      </Layout>
    </div>
  );
};

interface IContentGrid {
  isLoading: boolean;
  isError: boolean;
  data?: Array<IPokemon>;
}

const ContentGrid: React.FC<IContentGrid> = ({ isLoading, isError, data }) => {
  if (isError) {
    return <>Something gone wrong</>;
  }

  return (
    <>
      {isLoading
        ? range(0, limit).map((id) => <Card key={id} />)
        : data?.map(({ id, ...rest }) => <Card key={id} {...{ ...rest }} />)}
    </>
  );
};

export default Pokedex;
