import React from 'react';

import cn from 'classnames';
import styles from './Stats.module.scss';
import shared from './Shared.module.scss';

import { Stat } from '../../@types/pokemon';

const DEFAULTS: Stat[] = [
  { base_stat: 0, effort: 0, stat: { name: 'hp', url: '' } },
  { base_stat: 0, effort: 0, stat: { name: 'attack', url: '' } },
  { base_stat: 0, effort: 0, stat: { name: 'defense', url: '' } },
];

const Stats: React.FC<{ stats?: Stat[]; className?: string }> = ({ stats, className }) => {
  return (
    <div className={styles.statWrap}>
      {(stats || DEFAULTS).map(
        ({ base_stat, stat }) =>
          Object.keys(styles).includes(stat.name) && (
            <div key={stat.name} className={cn(styles.statItem, className)}>
              {stats ? (
                <div className={cn(styles.statValue, styles[stat.name])}>{base_stat}</div>
              ) : (
                <div className={cn(styles.skeleton_value, shared.skeleton_box)} />
              )}
              {stat.name}
            </div>
          ),
      )}
    </div>
  );
};

export default Stats;
