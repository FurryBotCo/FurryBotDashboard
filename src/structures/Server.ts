import express, { Application } from 'express';
import Config, { SSLConfig } from './Config';
import MiddlewareHandler from './handlers/MiddlewareHandler';
import EndpointHandler from './handlers/EndpointHandler';
import RequestHandler from './handlers/RequestHandler';
import ReactEngine from './engine/ReactEngine';
import { Logger } from './Logger';
import { join } from 'path';
import https from 'https';
import http from 'http';
import os from 'os';

export class Server {
  public middleware: MiddlewareHandler;
  private _server!: http.Server;
  public endpoints: EndpointHandler;
  public requests: RequestHandler;
  private logger: Logger;
  public config: Config;
  public app: Application;

  constructor() {
    this.middleware = new MiddlewareHandler(this);
    this.endpoints = new EndpointHandler(this);
    this.requests = new RequestHandler();
    this.logger = new Logger('Server');
    this.config = new Config();
    this.app = express();
  }

  async init() {
    this.logger.info('beep boop... loading server...');

    // Add in Express globals
    this.app.set('view engine', 'js');
    this.app.set('views', join(__dirname, '..', 'views'));
    this.app.use('/static', express.static(join(__dirname, '..', 'static')));
    this.app.engine('js', (path, options, callback) => ReactEngine(path, options, callback));

    // Run everything before loading anything
    await this.middleware.load();
    await this.endpoints.load();

    // Load the configuration
    this.config.load();

    // Create the server, we check if we have a valid SSL configuration to use [https.Server]
    // instead of [http.Server]
    this._server = http.createServer(this.app);

    // Now we load the server
    this._server.on('error', error => this.logger.error('An unexpected error has occured', error));

    const prefix = 'http';
    const port = this.config.get<number>('port', 3621);

    this._server.once('listening', () => {
      const address = this._server.address();
      const networks: string[] = [];

      if (typeof address === 'string') {
        networks.push(`- UNIX Sock "${address}"`);
      } else {
        if (address !== null) {
          if (address.address === '::')
            networks.push(`- Local: ${prefix}://localhost:${port}`);
          else
            networks.push(`- Network: ${prefix}://${address.address}:${port}`);
        }
      }

      const external = this._getExternalNetwork();
      if (external !== null) networks.push(`- Network: ${prefix}://${external}:${port}`);

      this.logger.info(`Dashboard is now running under port ${port}! Available connections are below`, networks);
    });

    this._server.listen(port);
  }

  close() {
    this.logger.warn('Closing server...');
    this._server.close();
  }

  private _getExternalNetwork() {
    const interfaces = os.networkInterfaces();

    for (const name of Object.keys(interfaces)) {
      for (const i of interfaces[name]!) {
        const { address, family, internal } = i;
        if (family === 'IPv4' && !internal) return address;
      }
    }

    return null;
  }
}
