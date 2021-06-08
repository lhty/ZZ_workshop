import React from 'react';

import { useStoreon } from 'storeon/react';
import { IpokedexState, PokedexEvents, pokedex_state_enum } from '../../store/pokedex';

import { Box, Sprite, Stats, Title, TypeLabels, Typography } from '../../components';
import { useDebounce, usePokemonData } from '../../hooks';

import styles from './Pokemon.module.scss';

const PokemonPage: React.FC = () => {
  const { selected_id: id } = useStoreon<IpokedexState, PokedexEvents>(pokedex_state_enum.selected_id);
  const [debounced_id] = useDebounce<number>(Number(id), 200);
  const { data, isFetching, isError } = usePokemonData(debounced_id);

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
