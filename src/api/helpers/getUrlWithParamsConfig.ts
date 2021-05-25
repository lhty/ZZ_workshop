import { format } from 'url';
import config from '../../config';

export const getUrlWithParamsConfig = (action: string, query?: Record<string, number | string>): string => {
  const param = query?.id || query?.name;
  const url = format({
    ...config.server,
    ...config.client.endpoint[action].uri,
    query: param ? {} : query,
  });
  return param ? url + param : url;
};
