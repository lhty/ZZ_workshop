import React from 'react';
import ReactDom from 'react-dom/server';
import { Request } from '@hapi/hapi';
import { setPath } from 'hookrouter';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import App from '../../App';

export const page = {
  method: 'GET',
  path: '/{any*}',
  handler: (req: Request) => {
    setPath(req.path);
    const pathIndexHTML = path.join(process.cwd(), 'dist', 'index.html');
    const template = handlebars.compile(fs.readFileSync(pathIndexHTML, 'utf8'));
    const result = ReactDom.renderToString(<App />);
    const page = template({
      content: result,
    });
    return page;
  },
};
