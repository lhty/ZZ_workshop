import config from '../config';

export const getUrlWithParamsConfig = (action: string, query?: any) => {
  const url = {
    ...config.server,
    ...config.client.endpoint[action].uri,
    query: {},
  };
  const pathname = Object.keys(query).reduce((acc, val) => {
    if (acc.includes(val)) {
      const result = acc.replace(`{${val}}`, query[val]);
      delete query[val];
      return result;
    }
    return acc;
  }, url.pathname);

  url.pathname = pathname;
  url.query = { ...query };

  return url;
};
