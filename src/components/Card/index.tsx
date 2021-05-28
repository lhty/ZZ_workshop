import React from 'react';

import { Box, Sprite, Stats, Title, TypeLabels } from '..';
import styles from './Card.module.scss';

import { IPokemon } from '../../@types/pokemon';

const Card: React.FC<Partial<IPokemon>> = ({ name, stats, sprites, types }) => {
  return (
    <Box className={styles.card}>
      <div className={styles.root}>
        <div className={styles.infoWrap}>
          <Title text={name} />
          <Stats stats={stats} />
          <TypeLabels types={types} />
        </div>
        <Sprite {...{ sprites, types, name }} />
      </div>
    </Box>
  );
};

export default Card;
