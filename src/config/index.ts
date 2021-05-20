const config = {
  server: {
    protocol: 'https',
    host: 'pokeapi.co',
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
} as const;

export default config;
