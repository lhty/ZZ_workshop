import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import Hapi from '@hapi/hapi';
import React from 'react';
import ReactDom from 'react-dom/server';
import { setPath } from 'hookrouter';
import App from '../App';

const init = async () => {
  const server = Hapi.server({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
  });

  const plugins = [require('@hapi/inert')];

  await server.register(plugins);

  server.route({
    method: 'GET',
    path: '/main.js',
    handler: (_, h) => h.file(path.join(process.cwd(), 'dist', 'main.js')),
  });

  server.route({
    method: 'GET',
    path: '/{any*}',
    handler: (req) => {
      setPath(req.path);
      const pathIndexHTML = path.join(process.cwd(), 'dist', 'index.html');
      const template = handlebars.compile(fs.readFileSync(pathIndexHTML, 'utf8'));
      const result = ReactDom.renderToString(<App />);
      const page = template({
        content: result,
      });
      return page;
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
