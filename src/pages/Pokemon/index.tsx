import React from 'react';
import { useQuery } from 'react-query';
import { getPokemonById } from '../../api/getters';

import styles from './Pokemon.module.scss';

export interface IPokemonPageProps {
  id: number;
}

const PokemonPage: React.FC<IPokemonPageProps> = ({ id }) => {
  const { data, isLoading, isError } = useQuery(['pokemonsData', { id }], () => getPokemonById({ id }), {
    keepPreviousData: true,
  });

  return (
    <div className={styles.root}>
      <div>{!isLoading && !isError && JSON.stringify(data, null, 2)}</div>
    </div>
  );
};

export default PokemonPage;
