import Hapi from '@hapi/hapi';
import inert from '@hapi/inert';
import routes from './routes';
import config from '../config';

const plugins = [inert];

const init = async () => {
  const server = Hapi.server(config.server);

  await server.register(plugins);
  server.route(routes);
  await server.start();

  console.warn('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
