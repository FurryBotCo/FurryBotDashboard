import type { Request, Response } from 'express';
import type { RouteDefinition } from '../decorators/Route';
import { Logger, Endpoint } from '..';

export default class EndpointHandler {
  public logger: Logger = new Logger('RequestHandler');

  async onRequest(endpoint: Endpoint, route: RouteDefinition, req: Request, res: Response) {
    //this.logger.request(`<- ${req.method.toUpperCase()} ${req.url} (route: ${route.endpoint})`);

    return res.render('Homepage', { hello: 'August' });
  }
}
