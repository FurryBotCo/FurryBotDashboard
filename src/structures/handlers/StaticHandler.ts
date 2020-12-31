import { Server, Logger } from '..';
import { promises as fs } from 'fs';
import { join } from 'path';

export default class EndpointHandler {
  private directory: string;
  private logger: Logger;
  private server: Server;

  constructor(server: Server) {
    this.directory = join(__dirname, '..', '..', 'static');
    this.server = server;
    this.logger = new Logger('Static');
  }

  async load() {
    this.logger.info('loading...');
    // do beep boop stuff here
  }
}
