/* eslint-disable no-console */
import React from 'react';

import { useQuery } from 'react-query';
import { IPokemon } from '../../@types/pokemon';

import { getPokemons } from '../../api';

import { Card, Header, Highlight, Layout, Typography } from '../../components';
import { range } from '../../lib';

import styles from './Pokedex.module.scss';

const limit = 50;

const Pokedex = () => {
  const [query, setQuery] = React.useState('');
  const { data, isLoading } = useQuery<IPokemon[], Error>('pokemons', () => getPokemons({ limit }));

  return (
    <div className={styles.root}>
      <Header />
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
            placeholder="Encuentra tu pokémon..."
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
          {isLoading
            ? range(0, limit).map((id) => <Card key={id} />)
            : data?.map(({ id, ...rest }) => <Card key={id} {...{ ...rest }} />)}
        </div>
      </Layout>
    </div>
  );
};

export default Pokedex;
