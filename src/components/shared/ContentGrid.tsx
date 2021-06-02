import React from 'react';
import { setQueryParams } from 'hookrouter';
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

  const setIdHandler = (e: React.MouseEvent | React.KeyboardEvent) => {
    setQueryParams({ id: e.currentTarget.getAttribute('data-id') });
  };

  return (
    <div className={styles.contentWrap}>
      {!isFetching
        ? data?.map((pokemon) => (
            <div
              data-id={pokemon.id}
              tabIndex={0}
              role="link"
              onClick={setIdHandler}
              onKeyPress={setIdHandler}
              key={pokemon.id}>
              <Card {...pokemon} />
            </div>
          ))
        : range(0, 20).map((skeleton) => <Card key={skeleton} />)}
    </div>
  );
};

export default ContentGrid;
