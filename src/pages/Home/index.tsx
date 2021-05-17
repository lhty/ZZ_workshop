import React from 'react';

import { Button, Footer, Header, Typography, Layout, Parallax } from '../../components';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <main className={styles.root}>
      <Header />
      <Layout className={styles.contentWrap}>
        <div className={styles.contentText}>
          <Typography>
            <b>Find</b> all your favorite <b>Pokemon</b>
          </Typography>
          <Typography type="p">You can know the type of Pokemon, its strengths, disadvantages and abilities</Typography>
          <Button onClick={() => null}>See pokemons</Button>
        </div>
        <Parallax />
      </Layout>
      <Footer />
    </main>
  );
};

export default Home;
