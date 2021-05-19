import React from 'react';
import cn from 'classnames';

import { IPokemon } from '../../@types/pokemon';

import { Typography } from '..';

import styles from './Card.module.scss';

const RGB_COLORS = new Map<string | undefined, string>(
  Object.entries({
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  }),
);

const Card: React.FC<Partial<IPokemon>> = ({ name, stats, sprites, types }) => {
  const bgColor: string = RGB_COLORS.get(types?.[Math.floor(Math.random() * types.length)].type.name) ?? '#f6f7f9';

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
                  <div className={cn(styles.statValue, styles[stat.name as keyof typeof styles])}>{base_stat}</div>
                  {stat.name}
                </div>
              ),
          )}
        </div>
        {types?.length && (
          <div className={styles.labelWrap}>
            {types?.map(({ slot, type }) => (
              <span key={slot} className={styles.label} style={{ backgroundColor: `${RGB_COLORS.get(type.name)}` }}>
                {type?.name}
              </span>
            ))}
          </div>
        )}
      </div>
      <div
        className={styles.pictureWrap}
        style={{ background: `linear-gradient(270deg, ${bgColor} 0.15%,  #f6f7f9 100%)` }}>
        <img src={sprites?.other?.['official-artwork'].front_default} alt={`${name} official-artwork`} />
      </div>
    </div>
  );
};

export default Card;
