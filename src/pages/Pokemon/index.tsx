import React from 'react';

import { Box, Sprite, Stats, Title, TypeLabels, Typography } from '../../components';
import { usePokemonData } from '../../hooks';

import styles from './Pokemon.module.scss';

const PokemonPage: React.FC<{
  id: number;
}> = ({ id }) => {
  const { data, isFetching, isError } = usePokemonData(id);

  if (!isFetching && isError) {
    return (
      <Box type="modal" className={styles.root}>
        <Typography className={styles.error}>Not found :(</Typography>
      </Box>
    );
  }

  return (
    <Box type="modal" color={data?.types[0].type.name} className={styles.root}>
      <div className={styles.leftWrap}>
        <Sprite className={styles.pictureWrap} {...data} />
        <TypeLabels className={styles.labelWrap} types={data?.types} />
      </div>
      <div className={styles.infoWrap}>
        <div className={styles.infoHead}>
          <Title className={styles.infoName} text={data?.name} />
          {data && <div className={styles.idBadge}>{id}</div>}
        </div>
        <div className={styles.infoStats}>
          <Box className={styles.ability}>
            {data?.abilities.map(({ ability }) => (
              <h4 key={ability.url}>{ability.name}</h4>
            ))}
          </Box>
          <Stats
            className={styles.statWrapper}
            stats={data?.stats}
            extend={{
              speed: styles.speed,
              'special-attack': styles['special-attack'],
              'special-defense': styles['special-defense'],
            }}
          />
        </div>
      </div>
    </Box>
  );
};

export default PokemonPage;
