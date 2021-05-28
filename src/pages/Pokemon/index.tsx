import React from 'react';

import { Box, Sprite, Stats, Title, TypeLabels, Typography } from '../../components';
import { usePokemonData } from '../../hooks';

import styles from './Pokemon.module.scss';

const PokemonPage: React.FC<{
  id: number;
}> = ({ id }) => {
  const { data } = usePokemonData({ id });

  return (
    <Box type="modal" color={data?.types[0].type.name} className={styles.root}>
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
        <div className={styles.infoStats}>
          <Box className={styles.ability}>Abilities</Box>
          <Box className={styles.resources}>HP EXP</Box>
          <Stats className={styles.statWrapper} stats={data?.stats} />
        </div>
      </div>
    </Box>
  );
};

export default PokemonPage;
