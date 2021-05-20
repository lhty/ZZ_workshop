import { format } from 'url';
import { getUrlWithParamsConfig } from './getUrlWithParamsConfig';

export const req = async (endpoint: string, query: Record<string, any>) => {
  const URI = format({ ...getUrlWithParamsConfig(endpoint), query });
  const data = await fetch(URI);
  const res = await data.json();
  return res;
};
