import React from 'react';

import cn from 'classnames';
import styles from './Sprite.module.scss';

import { IPokemon } from '../../@types/pokemon';
import { Box } from '..';

const Sprite: React.FC<Partial<IPokemon> & { className?: string }> = ({ className, sprites, types, name }) => {
  if (!sprites) {
    return null;
  }
  return (
    <Box type="sprite" className={cn(styles.pictureWrap, className)} color={types?.[0].type.name}>
      <img
        src={sprites?.other?.['official-artwork'].front_default || sprites?.front_default}
        alt={`${name} official-artwork`}
      />
    </Box>
  );
};

export default Sprite;
