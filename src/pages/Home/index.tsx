import React from 'react';

import { Button, Footer, Header, Heading, Layout, Parallax } from '../../components';
import styles from './Home.module.scss';

interface Props {}

const Home = (props: Props) => {
  return (
    <main className={styles.root}>
      <Header />
      <Layout className={styles.contentWrap}>
        <div className={styles.contentText}>
          <Heading>
            <b>Find</b> all your favorite <b>Pokemon</b>
          </Heading>
          <p>You can know the type of Pokemon, its strengths, disadvantages and abilities</p>
          <Button onClick={() => null}>See pokemons</Button>
        </div>
        <Parallax />
      </Layout>
      <Footer />
    </main>
  );
};

export default Home;
