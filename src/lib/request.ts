import { format } from 'url';
import { getUrlWithParamsConfig } from './getUrlWithParamsConfig';

export const req = async (action: string, query?: Record<string, number>) => {
  const URI = format(getUrlWithParamsConfig(action, query));
  const data = await fetch(URI);
  const res = await data.json();
  return res;
};
