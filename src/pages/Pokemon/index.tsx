import React from 'react';
import { IPokemon } from '../../@types/pokemon';

import { Modal, Typography } from '../../components';

import styles from './Pokemon.module.scss';

export interface IPokemonPageProps {
  id: number;
}

/* TBD */
const PokemonPage: React.FC<IPokemonPageProps> = ({ id }) => {
  const { data, isLoading, isError } = { data: {} as IPokemon, isLoading: false, isError: false };
  if (isLoading) {
    return <>Loading ...</>;
  }

  if (isError) {
    return <>Error :(</>;
  }

  return (
    <Modal id="pokemon" onClose={() => null}>
      <div className={styles.root}>
        <div className={styles.pictureWrap}>
          <img
            src={data?.sprites?.other?.['official-artwork'].front_default || data?.sprites?.front_default}
            alt={`${data?.name} official-artwork`}
          />
        </div>
        <div className={styles.stats_wrapper}>
          <Typography size="l" className={styles.titleName}>
            {data?.name}
          </Typography>
        </div>
      </div>
    </Modal>
  );
};

export default PokemonPage;
