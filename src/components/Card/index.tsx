import React from 'react';
import { Typography } from '..';

import { IPokemon } from '../../@types/pokemon';

import styles from './Card.module.scss';

const Card: React.FC<Partial<IPokemon>> = ({ name, img, stats, types }) => {
  return (
    <div className={styles.root}>
      <div className={styles.infoWrap}>
        <Typography size="l" className={styles.titleName}>
          {name}
        </Typography>
        <div className={styles.statWrap}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>{stats?.attack}</div>
            Attack
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>{stats?.defense}</div>
            Defense
          </div>
        </div>
        {types?.length && (
          <div className={styles.labelWrap}>
            {types?.map((type) => (
              <span key={type} className={styles.label}>
                {type}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={styles.pictureWrap}>
        <img src={img} alt={name} />
      </div>
    </div>
  );
};

export default Card;
