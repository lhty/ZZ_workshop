import React from 'react';
import { useQuery } from 'react-query';
import { getPokemonById } from '../../api/getters';
import { Card } from '../../components';

// import styles from './Pokemon.module.scss';

export interface IPokemonPageProps {
  id: number;
}

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

  return <Card {...{ ...data }} />;
};

export default PokemonPage;
