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

  async load() {
    this.logger.info('loading...');
    // do beep boop stuff here
  }
}
