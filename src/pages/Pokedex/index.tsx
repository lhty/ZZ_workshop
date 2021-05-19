import React from 'react';

import { useQuery } from 'react-query';
import { IPokemon } from '../../@types/pokemon';

import { getPokemons } from '../../api';

import { Card, Header, Layout, Typography } from '../../components';

import styles from './Pokedex.module.scss';

const Pokedex = () => {
  const { isLoading, isError, data } = useQuery<IPokemon[], Error>('pokemons', getPokemons);

  return (
    <div className={styles.root}>
      <Header />
      <Layout className={styles.layerWrap}>
        <Typography className={styles.description}>
          800 <b>Pokemons</b> for you to choose your favorite
        </Typography>
        <input placeholder="Encuentra tu pokémon..." className={styles.search} type="text" />
        <div className={styles.filters}>
          <select id="whatever">
            <option value="fire">Fire</option>
            <option value="normal">Normal</option>
            <option value="electric">Electric</option>
            <option value="water">Water</option>
          </select>
        </div>
        {isLoading || isError ? (
          <>Loading ...</>
        ) : (
          <div className={styles.contentWrap}>
            {data?.map(({ id, ...rest }) => (
              <Card key={id} {...{ ...rest }} />
            ))}
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Pokedex;
