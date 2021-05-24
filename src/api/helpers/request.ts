import { getUrlWithParamsConfig } from './getUrlWithParamsConfig';

export const request = async <T, K>(action: string, query?: Record<string, K>): Promise<T> => {
  const data = await fetch(getUrlWithParamsConfig(action, query));
  const res = await data.json();
  return res;
};
