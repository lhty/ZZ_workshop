import React from 'react';
import { Typography } from '..';

import { IPokemon } from '../../@types/pokemon';

import styles from './Card.module.scss';

const Card: React.FC<Partial<IPokemon>> = ({ name, sprites, stats, types }) => {
  return (
    <div className={styles.root}>
      <div className={styles.infoWrap}>
        <Typography size="l" className={styles.titleName}>
          {name}
        </Typography>
        <div className={styles.statWrap}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>123</div>
            Attack
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>123</div>
            Defense
          </div>
        </div>
        {types?.length && (
          <div className={styles.labelWrap}>
            {types?.map(({ slot, type }) => (
              <span key={slot} className={styles.label}>
                {type?.name}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={styles.pictureWrap}>
        <img src={sprites?.front_default} alt={sprites?.front_default} />
      </div>
    </div>
  );
};

export default Card;
