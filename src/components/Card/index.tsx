import React from 'react';

import { Sprite, Stats, Title, TypeLabels } from '..';
import styles from './Card.module.scss';

import { IPokemon } from '../../@types/pokemon';

const Card: React.FC<Partial<IPokemon>> = ({ name, stats, sprites, types }) => {
  return (
    <div className={styles.root}>
      <div className={styles.infoWrap}>
        <Title text={name} />
        <Stats stats={stats} />
        <TypeLabels types={types} />
      </div>
      <Sprite {...{ sprites, types, name }} />
    </div>
  );
};

export default Card;
