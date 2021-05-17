import React, { useEffect, useReducer } from 'react';

import styles from './Parallax.module.scss';

import SmallPokeBallPng from './assets/PokeBall1.png';
import CloudPng from './assets/Cloud1.png';
import PokeBallPng from './assets/Pokeball2.png';
import PikachuPng from './assets/Pikachu.png';

type Pos = { x: number; y: number };

const Parallax = () => {
  const [{ x, y }, setPos] = useReducer((_: Pos, update: Pos) => update, { x: 0, y: 0 });

  useEffect(() => {
    const handleMouseWatcher = (e: MouseEvent) => setPos({ x: e.screenX, y: e.screenY });
    window.addEventListener('mousemove', handleMouseWatcher);
    return () => window.removeEventListener('mousemove', handleMouseWatcher);
  }, [x, y]);

  return (
    <div className={styles.root}>
      <div className={styles.smallPokeBall} style={{ transform: `translate(${-x * 0.05}px,${-y * 0.01}px)` }}>
        <img src={SmallPokeBallPng} alt="Small PokeBall" />
      </div>
      <div className={styles.cloud} style={{ transform: `translate(${-x * 0.02}px,0px)` }}>
        <img src={CloudPng} alt="Cloud PokeBall" />
      </div>
      <div className={styles.cloudBig} style={{ transform: `translate(${-x * 0.01}px,0px)` }}>
        <img src={CloudPng} alt="Cloud Big PokeBall" />
      </div>
      <div className={styles.pokeBall} style={{ transform: `translate(0px,${y * 0.03}px)` }}>
        <img src={PokeBallPng} alt="Big PokeBall" />
      </div>
      <div className={styles.pikachu} style={{ transform: `translate(${-x * 0.01}px,${-y * 0.03}px)` }}>
        <img src={PikachuPng} alt="Cloud PokeBall" />
      </div>
    </div>
  );
};

export default Parallax;
