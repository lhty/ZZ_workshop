import { navigate } from 'hookrouter';
import React from 'react';

import { Button, Footer, Header, Typography, Layout, Parallax } from '../../components';
import { LinkEnum } from '../../routes';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.root}>
      <Header />
      <Layout className={styles.contentWrap}>
        <div className={styles.contentText}>
          <Typography>
            <b>Find</b> all your favorite <b>Pokemon</b>
          </Typography>
          <Typography type="p">You can know the type of Pokemon, its strengths, disadvantages and abilities</Typography>
          <Button onClick={() => navigate(LinkEnum.POKEDEX)}>See pokemons</Button>
        </div>
        <Parallax />
      </Layout>
      <Footer />
    </div>
  );
};

export default Home;
