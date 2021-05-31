import { format } from 'url';
import { getUrlWithParamsConfig } from '.';

export const request = async <T>(action: string, query?: Record<string, number>): Promise<T> => {
  const { method, uri, body } = getUrlWithParamsConfig(action, query);

  const options: Record<string, string> = { method };

  if (Object.keys(body).length > 0) {
    options.body = JSON.stringify(body);
  }

  const data = await fetch(format(uri), options);
  const res = await data.json();
  return res;
};
