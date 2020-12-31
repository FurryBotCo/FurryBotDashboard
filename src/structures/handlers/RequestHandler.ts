import type { Request, Response } from 'express';
import { Server, Logger } from '..';

export default class EndpointHandler {
  private logger: Logger;
  private server: Server;

  constructor(server: Server) {
    this.server = server;
    this.logger = new Logger('RequestHandler');
  }

  async onRequest(req: Request, res: Response) {
    this.logger.request(`-> ${req.method.toUpperCase()} ${req.url}`);
  }
}
