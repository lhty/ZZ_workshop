import config from '../config';

export const getUrlWithParamsConfig = (endpointConfig: string) => ({
  ...config.server,
  ...config.client.endpoint[endpointConfig].uri,
});
