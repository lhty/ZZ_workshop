type getterType = {
  method: 'GET';
  uri: Record<'pathname', string>;
};
interface IConfig {
  server: Record<'protocol' | 'host' | 'port', string>;
  client: { endpoint: Record<string, getterType> };
}

const config: IConfig = {
  server: {
    protocol: 'https',
    host: 'pokeapi.co',
    port: '',
  },
  client: {
    endpoint: {
      getPokemons: {
        method: 'GET',
        uri: {
          pathname: '/api/v2/pokemon',
        },
      },
    },
  },
};

export default config;
