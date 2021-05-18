import React from 'react';

import { mockedPokemons } from '../../api/__mock__/pokemons';
import { Card, Header, Layout, Typography } from '../../components';

import styles from './Pokedex.module.scss';

const Pokedex = () => {
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
        <div className={styles.contentWrap}>
          {mockedPokemons.map(({ id, ...rest }) => (
            <Card key={id} {...{ ...rest }} />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Pokedex;
