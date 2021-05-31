import { getUrlWithParamsConfig } from './getUrlWithParamsConfig';

describe('getUrlWithParamsConfig', () => {
  test('Should recieve action from config and empty query object and return object with path,protocol and host fields', () => {
    const url = getUrlWithParamsConfig('getPokemons', {});

    expect(url).toEqual({
      method: 'GET',
      uri: {
        protocol: 'https',
        host: 'pokeapi.co',
        port: '',
        pathname: '/api/v2/pokemon',
        query: {},
      },
      body: {},
    });
  });
  test('Should recieve action from config and { name : "Pikachu" } query object and return object with path,protocol,host and query param fields', () => {
    const url = getUrlWithParamsConfig('getPokemons', { name: 'Pikachu' });

    expect(url).toEqual({
      method: 'GET',
      uri: {
        protocol: 'https',
        host: 'pokeapi.co',
        port: '',
        pathname: '/api/v2/pokemon',
        query: { name: 'Pikachu' },
      },
      body: {},
    });
  });
});

const toCapitalizeFirstLetter = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

describe('toCapitalizeFirstLetter test', () => {
  test('Recieve "test" should return "Test"', () => {
    expect(toCapitalizeFirstLetter('test')).toEqual('Test');
  });
  test('Recieve "" should return "bad input"', () => {
    expect(toCapitalizeFirstLetter('')).toEqual('');
  });
});
