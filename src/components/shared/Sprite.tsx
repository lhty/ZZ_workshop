import React from 'react';

import cn from 'classnames';
import styles from './Sprite.module.scss';
import shared from './Shared.module.scss';

import { IPokemon } from '../../@types/pokemon';

const Sprite: React.FC<Partial<IPokemon> & { className?: string }> = ({ className, sprites, types, name }) => {
  if (!sprites) {
    return null;
  }
  return (
    <div className={cn(styles.pictureWrap, shared[`gradient_${types?.[0].type.name}`], className)}>
      <img
        src={sprites?.other?.['official-artwork'].front_default || sprites?.front_default}
        alt={`${name} official-artwork`}
      />
    </div>
  );
};

export default Sprite;
