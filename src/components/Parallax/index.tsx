import React from 'react';

import styles from './Parallax.module.scss';

import SmallPokeBallPng from './assets/PokeBall1.png';
import CloudPng from './assets/Cloud1.png';
import PokeBallPng from './assets/Pokeball2.png';
import PikachuPng from './assets/Pikachu.png';

const Parallax = () => {
  return (
    <div className={styles.root}>
      <div className={styles.smallPokeBall}>
        <img src={SmallPokeBallPng} alt="Small PokeBall" />
      </div>
      <div className={styles.cloud}>
        <img src={CloudPng} alt="Cloud PokeBall" />
      </div>
      <div className={styles.cloudBig}>
        <img src={CloudPng} alt="Cloud Big PokeBall" />
      </div>
      <div className={styles.pokeBall}>
        <img src={PokeBallPng} alt="Big PokeBall" />
      </div>
      <div className={styles.pikachu}>
        <img src={PikachuPng} alt="Cloud PokeBall" />
      </div>
    </div>
  );
};

export default Parallax;
