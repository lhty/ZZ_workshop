/* eslint-disable no-console */
import React from 'react';

import { useQuery } from 'react-query';

import { getPokemons, IPokemonResults } from '../../api';

import { Card, Highlight, Layout, Typography } from '../../components';
import { range } from '../../lib';

import styles from './Pokedex.module.scss';

const limit = 50;

const Pokedex = () => {
  const [query, setQuery] = React.useState('');
  const { data, isLoading, isError } = useQuery<IPokemonResults, Error>(['pokemons'], () => getPokemons({ limit }));

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
            console.log(query);
          }}>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            value={query}
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
          <ContentGrid {...{ isLoading, isError, data }} />
        </div>
      </Layout>
    </div>
  );
};

interface IContentGrid {
  isLoading: boolean;
  isError: boolean;
  data?: IPokemonResults;
}

const ContentGrid: React.FC<IContentGrid> = ({ isLoading, isError, data }) => {
  if (isError) {
    return <>Something gone wrong</>;
  }

  return (
    <>
      {isLoading
        ? range(0, limit).map((id) => <Card key={id} />)
        : data?.results?.map(({ id, ...rest }) => <Card key={id} {...{ ...rest }} />)}
    </>
  );
};

export default Pokedex;
