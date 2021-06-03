import React from 'react';
import ReactDom from 'react-dom/server';
import Hapi, { Request, ResponseToolkit } from '@hapi/hapi';
import inert from '@hapi/inert';
import handlebars from 'handlebars';
import { setPath } from 'hookrouter';
import path from 'path';
import fs from 'fs';
import App from '../App';
import config from '../config';

const plugins = [inert];

const routes = [
  {
    method: 'GET',
    path: '/main.js',
    handler: (_: Request, h: ResponseToolkit) => h.file(path.join(process.cwd(), 'dist', 'main.js')),
  },
  {
    method: 'GET',
    path: '/{any*}',
    handler: (req: Request) => {
      setPath(req.path);
      const pathIndexHTML = path.join(process.cwd(), 'dist', 'index.html');
      const template = handlebars.compile(fs.readFileSync(pathIndexHTML, 'utf8'));
      const result = ReactDom.renderToNodeStream(<App />);
      const page = template({
        content: result,
      });
      return page;
    },
  },
];

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
