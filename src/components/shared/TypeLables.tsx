import React from 'react';

import cn from 'classnames';
import styles from './TypeLabels.module.scss';
import shared from './Shared.module.scss';

import { Type } from '../../@types/pokemon';

const TypeLabels: React.FC<{ types?: Array<Type>; className?: string }> = ({ className, types = [] }) => {
  if (!types.length) {
    return (
      <div className={cn(className, styles.labelWrap)}>
        <span className={cn(styles.skeleton_label, shared.skeleton_box)} />
        <span className={cn(styles.skeleton_label, shared.skeleton_box)} />
      </div>
    );
  }

  return (
    <div className={cn(className, styles.labelWrap)}>
      {types?.map(({ slot, type }) => (
        <span key={slot} className={cn(styles.label, shared[type.name])}>
          {type?.name}
        </span>
      ))}
    </div>
  );
};

export default TypeLabels;
