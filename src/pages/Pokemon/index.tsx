import React from 'react';
import { navigate } from 'hookrouter';
import { useQuery } from 'react-query';
import { getPokemonById } from '../../api/getters';
import { Modal, Typography } from '../../components';
import { LinkEnum } from '../../routes';

import styles from './Pokemon.module.scss';

export interface IPokemonPageProps {
  id: number;
}

/* TBD */
const PokemonPage: React.FC<IPokemonPageProps> = ({ id }) => {
  const { data, isLoading, isError } = useQuery(['pokemonsData', { id }], () => getPokemonById({ id }), {
    keepPreviousData: true,
  });
  if (isLoading) {
    return <>Loading ...</>;
  }

  if (isError) {
    return <>Error :(</>;
  }

  return (
    <Modal id="pokemon" onClose={() => navigate(LinkEnum.POKEDEX)}>
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
