import React from 'react';
import { Typography, Card } from '..';
import { range } from '../../lib';
import styles from './ContentGrid.module.scss';
import { IPokemon } from '../../@types/pokemon';

interface IContentGrid {
  data?: IPokemon[];
  isLoading: boolean;
  isIdle: boolean;
  isError: boolean;
  isFetching: boolean;
}

const ContentGrid: React.FC<IContentGrid> = ({ data, isLoading, isIdle, isError, isFetching }) => {
  if (isError) {
    return <Typography>Something went wrong</Typography>;
  }

  if (!isIdle && !data?.length && !isLoading) {
    return <Typography>Nothing found :(</Typography>;
  }

  return (
    <div className={styles.contentWrap}>
      {!isFetching
        ? data?.map((pokemon) => <Card key={pokemon.id} {...pokemon} />)
        : range(0, 20).map((skeleton) => <Card key={skeleton} />)}
    </div>
  );
};

export default React.memo(ContentGrid);
