import { Request, ResponseToolkit } from '@hapi/hapi';
import path from 'path';

export const init = {
  method: 'GET',
  path: '/main.js',
  handler: (_: Request, h: ResponseToolkit) => h.file(path.join(process.cwd(), 'dist', 'main.js')),
};
