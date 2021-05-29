import { format } from 'url';
import { getUrlWithParamsConfig } from '.';

export const request = async <T>(action: string, query?: Record<string, number>): Promise<T> => {
  const data = await fetch(format(getUrlWithParamsConfig(action, query)));
  const res = await data.json();
  return res;
};
