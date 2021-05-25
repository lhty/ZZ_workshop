import { getUrlWithParamsConfig } from './getUrlWithParamsConfig';

export const request = async <T>(action: string, query?: Record<string, number>): Promise<T> => {
  const data = await fetch(getUrlWithParamsConfig(action, query));
  const res = await data.json();
  return res;
};
