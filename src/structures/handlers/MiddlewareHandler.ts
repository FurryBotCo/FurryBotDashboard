import type { NextFunction, Request, Response } from 'express';
import { Server, Logger } from '..';
import { promises as fs } from 'fs';
import { join } from 'path';

type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

type Middleware = () => ExpressMiddleware;

export default class EndpointHandler {
  private directory: string;
  private logger: Logger;
  private server: Server;

  constructor(server: Server) {
    this.directory = join(__dirname, '..', '..', 'middleware');
    this.server = server;
    this.logger = new Logger('Middleware');
  }

  // TODO: move this to a util class
  private async _readdir(path: string = this.directory) {
    let results: string[] = [];
    const files = await fs.readdir(path);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const stats = await fs.lstat(join(path, file));

      if (stats.isDirectory()) {
        const r = await this._readdir(join(path, file));
        results = results.concat(r);
      } else {
        results.push(join(path, file));
      }
    }

    return results;
  }

  async load() {
    this.logger.info('Loading all middleware!');

    const files = await this._readdir();
    if (!files.length) {
      this.logger.warn('Missing middleware! Do you have a corrupt installation?');
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ctor = await import(file);

      if (!ctor.default) {
        this.logger.warn(`Middleware at "${file}" is missing a default export`);
        continue;
      }

      const middleware: Middleware = ctor.default;
      this.server.app.use(middleware);
    }

    this.logger.info('Loaded all middleware!');
  }
}
