import { Endpoint, Server, Logger } from '..';
import { getRouteDefinitions } from '../decorators/Route';
import { promises as fs } from 'fs';
import { Collection } from '@augu/collections';
import { join } from 'path';

export default class EndpointHandler extends Collection<string, Endpoint> {
  private directory: string;
  private logger: Logger;
  private server: Server;

  constructor(server: Server) {
    super();

    this.directory = join(__dirname, '..', '..', 'endpoints');
    this.server = server;
    this.logger = new Logger('Endpoints');
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
    this.logger.info('Initializing all endpoints...');

    const files = await this._readdir();
    if (!files.length) {
      this.logger.warn('Missing endpoints! Do you have a corrupt installation?');
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ctor = await import(file);

      if (!ctor.default) {
        this.logger.warn(`Endpoint at "${file}" is missing a default export`);
        continue;
      }

      const endpoint: Endpoint = new ctor.default().init(this.server);
      const routes = getRouteDefinitions(endpoint);
      endpoint.append(routes);

      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const prefix = Endpoint._mergePrefix(endpoint, route.endpoint);

        this.logger.info(`Found route ${prefix} in endpoint ${endpoint.prefix}`);
        this.server.app.get(prefix, (req, res) =>
          this.server.requests.onRequest(endpoint, route, req, res)
        );
      }

      this.set(endpoint.prefix, endpoint);
      this.logger.info(`Added endpoint "${endpoint.prefix}" successfully with ${routes.length} routes.`);
    }
  }
}
