import React from 'react';
import { A } from 'hookrouter';
import { Typography, Card } from '..';
import { usePokedexData } from '../../hooks';
import { range } from '../../lib';
import styles from './ContentGrid.module.scss';

interface IContentGrid {
  limit: number;
  offset: number;
  search: string;
}

const ContentGrid: React.FC<IContentGrid> = ({ limit, offset, search }) => {
  const { data, isLoading, isIdle, isError } = usePokedexData({
    limit,
    offset,
    search,
  });

  if (isError) {
    return <Typography>Something went wrong</Typography>;
  }

  if (!isIdle && !data?.length && !isLoading) {
    return <Typography>Nothing found :(</Typography>;
  }

  return (
    <div className={styles.contentWrap}>
      {data
        ? data.map((pokemon) => (
            <A key={pokemon.id} href={`pokedex/${pokemon.id}`}>
              <Card {...pokemon} />
            </A>
          ))
        : range(0, 20).map((skeleton) => <Card key={skeleton} />)}
    </div>
  );
};

export default ContentGrid;
