import express, { Application } from 'express';
import Config, { SSLConfig } from './Config';
import MiddlewareHandler from './handlers/MiddlewareHandler';
import EndpointHandler from './handlers/EndpointHandler';
import RequestHandler from './handlers/RequestHandler';
import StaticHandler from './handlers/StaticHandler';
import ReactEngine from './engine/ReactEngine';
import { Logger } from './Logger';
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
  public static: StaticHandler;
  public app: Application;

  constructor() {
    this.middleware = new MiddlewareHandler(this);
    this.endpoints = new EndpointHandler(this);
    this.requests = new RequestHandler(this);
    this.logger = new Logger('Server');
    this.config = new Config();
    this.static = new StaticHandler(this);
    this.app = express();
  }

  async init() {
    this.logger.info('beep boop... loading server...');

    // Add .jsx files into the engine for rendering
    this.app.engine('jsx', (path, options) => ReactEngine(path, options));

    // Run everything before loading anything
    await this.middleware.load();
    await this.endpoints.load();
    await this.static.load();

    // Load the configuration
    this.config.load();

    // Create the server, we check if we have a valid SSL configuration to use [https.Server]
    // instead of [http.Server]
    const ssl = this.config.get<SSLConfig | null>('ssl', null);
    this._server = ssl !== undefined
      ? https.createServer({ cert: ssl?.cert, key: ssl?.key, ca: ssl?.ca }, this.app)
      : http.createServer(this.app);

    // Now we load the server
    this._server.on('error', error => this.logger.error('An unexpected error has occured', error));

    const prefix = ssl !== undefined ? 'https' : 'http';
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

      const external = this._getExternalNetworks();
      const all = networks.concat(external.map(n => `- Network: ${prefix}://${n}:${port}`));

      this.logger.info(`Dashboard is now running under port ${port}! Available connections are below`, '', all);
    });

    this._server.listen(port);
  }

  private _getExternalNetworks() {
    const networks: string[] = [];
    const interfaces = os.networkInterfaces();

    for (const name of Object.keys(interfaces)) {
      for (const i of interfaces[name]!) {
        const { address, family, internal } = i;
        if (family === 'IPv4' && !internal) networks.push(address);
      }
    }

    return networks;
  }
}
