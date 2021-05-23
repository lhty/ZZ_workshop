import React from 'react';
import cn from 'classnames';

import { IPokemon } from '../../@types/pokemon';

import { Typography } from '..';

import styles from './Card.module.scss';

const Card: React.FC<Partial<IPokemon>> = ({ name, stats, sprites, types }) => {
  if (!name && !stats) {
    return (
      <div className={styles.root}>
        <div className={styles.infoWrap}>
          <div className={cn(styles.skeleton_title, styles.skeleton_box)} />
          <div className={styles.statWrap}>
            {['hp', 'attack', 'defense'].map((stat) => (
              <div key={stat} className={styles.statItem}>
                <div className={cn(styles.skeleton_value, styles.skeleton_box)} />
                {stat}
              </div>
            ))}
          </div>
          <div className={styles.labelWrap}>
            <span className={cn(styles.skeleton_label, styles.skeleton_box)} />
            <span className={cn(styles.skeleton_label, styles.skeleton_box)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.infoWrap}>
        <Typography size="l" className={styles.titleName}>
          {name}
        </Typography>
        <div className={styles.statWrap}>
          {stats?.map(
            ({ base_stat, stat }) =>
              Object.keys(styles).includes(stat.name) && (
                <div key={stat.name} className={styles.statItem}>
                  <div className={cn(styles.statValue, styles[stat.name])}>{base_stat}</div>
                  {stat.name}
                </div>
              ),
          )}
        </div>
        {types?.length && (
          <div className={styles.labelWrap}>
            {types?.map(({ slot, type }) => (
              <span key={slot} className={cn(styles.label, styles[type.name])}>
                {type?.name}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={cn(styles.pictureWrap, styles[`gradient_${types?.[0].type.name}`])}>
        <img src={sprites?.other?.['official-artwork'].front_default} alt={`${name} official-artwork`} />
      </div>
    </div>
  );
};

export default Card;
