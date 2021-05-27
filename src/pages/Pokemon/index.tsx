import React from 'react';

import { Sprite, Title, TypeLabels, Typography } from '../../components';
import { usePokemonData } from '../../hooks';

import styles from './Pokemon.module.scss';

const PokemonPage: React.FC<{
  id: number;
}> = ({ id }) => {
  const { data } = usePokemonData({ id });

  return (
    <div className={styles.root}>
      <div className={styles.leftWrap}>
        <Sprite className={styles.pictureWrap} {...data} />
        <TypeLabels className={styles.labelWrap} types={data?.types} />
      </div>
      <div className={styles.infoWrap}>
        <div className={styles.infoHead}>
          <Title className={styles.infoName} text={data?.name} />
          <Typography className={styles.infoGen}>Generation III</Typography>
          <div className={styles.idBadge}>{id}</div>
        </div>
        <div className={styles.infoStats}>stats</div>
      </div>
    </div>
  );
};

export default PokemonPage;
