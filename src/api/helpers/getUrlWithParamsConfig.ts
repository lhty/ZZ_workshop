import { format } from 'url';
import config from '../../config';

export const getUrlWithParamsConfig = (action: string, query = {}) => {
  return format({
    ...config.server,
    ...config.client.endpoint[action].uri,
    query,
  });
};
