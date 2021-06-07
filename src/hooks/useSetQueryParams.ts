/* eslint-disable no-return-assign */
import { useQueryParams } from 'hookrouter';
import React from 'react';

export const useSetQueryParams = (props: Record<string, string>) => {
  const [params, setQueryParams] = useQueryParams();
  const new_params = Object.entries(props).reduce(
    (acc, [key, val]) => (val || val.length ? ((acc[key] = val), acc) : acc),
    { ...params },
  );

  React.useEffect(() => {
    setQueryParams(new_params);
    return () => {
      setQueryParams({}, true);
    };
  }, []);
};
