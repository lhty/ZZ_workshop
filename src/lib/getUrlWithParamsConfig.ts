import config from '../config';

export const getUrlWithParamsConfig = (action: string, query = {}) => ({
  ...config.server,
  ...config.client.endpoint[action].uri,
  ...query,
});
