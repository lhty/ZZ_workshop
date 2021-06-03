type getterType = {
  method: 'GET';
  uri: Record<'pathname', string>;
};
interface IConfig {
  server: Record<string, number | string>;
  api: Record<'protocol' | 'host' | 'port', string>;
  client: { endpoint: Record<string, getterType> };
}

const config: IConfig = {
  server: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
  },
  api: {
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
      getPokemonTypes: {
        method: 'GET',
        uri: {
          pathname: '/api/v2/type',
        },
      },
      getPokemonById: {
        method: 'GET',
        uri: {
          pathname: '/api/v2/pokemon/{id}',
        },
      },
      getPokemonsByType: {
        method: 'GET',
        uri: {
          pathname: '/api/v2/type/{type}',
        },
      },
    },
  },
};

export enum cache_names {
  pokemon_raw = 'all_pokemon_raw',
  pokemon_data = 'pokedex',
  pokemon = 'pokemon',
}

export default config;
