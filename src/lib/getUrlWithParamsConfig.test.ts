import { getUrlWithParamsConfig } from './getUrlWithParamsConfig';

describe('getUrlWithParamsConfig', () => {
  test('Should recieve action from config and empty query object and return object with path,protocol and host fields', () => {
    const url = getUrlWithParamsConfig('getPokemons', {});

    expect(url).toEqual({
      protocol: 'https',
      host: 'pokeapi.co',
      pathname: '/api/v2/pokemon',
      port: '',
      query: {},
    });
  });
  test('Should recieve action from config and { name : "Pikachu" } query object and return object with path,protocol,host and query param fields', () => {
    const url = getUrlWithParamsConfig('getPokemons', { name: 'Pikachu' });

    expect(url).toEqual({
      protocol: 'https',
      host: 'pokeapi.co',
      pathname: '/api/v2/pokemon',
      port: '',
      query: { name: 'Pikachu' },
    });
  });
});
