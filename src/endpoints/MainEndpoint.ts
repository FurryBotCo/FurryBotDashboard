import type { Request, Response } from 'express';
import { Endpoint, Route } from '../structures';

export default class MainEndpoint extends Endpoint {
  constructor() {
    super('/');
  }

  @Route('/')
  async main(req: Request, res: Response) {
    return res.render('Homepage', { hello: 'August' });
  }
}
