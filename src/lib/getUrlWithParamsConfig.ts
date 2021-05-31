import config from '../config';

interface Iendpoint {
  method: string;
  uri: {
    pathname: string;
    query?: object;
  };
}

export const getUrlWithParamsConfig = (action: string, params?: object) => {
  const { method, uri }: Iendpoint = config.client.endpoint[action];
  let body = {};

  const apiConfigUri = {
    ...config.server,
    ...uri,
    query: { ...uri.query },
  };

  const query = { ...params };

  const pathname = Object.keys(query).reduce((acc, val) => {
    if (acc.includes(val)) {
      const result = acc.replace(`{${val}}`, query[val]);
      delete query[val];
      return result;
    }
    return acc;
  }, apiConfigUri.pathname);

  apiConfigUri.pathname = pathname;

  if (method === 'GET') {
    apiConfigUri.query = {
      ...apiConfigUri.query,
      ...query,
    };
  } else {
    body = query;
  }

  return { method, uri: apiConfigUri, body };
};
