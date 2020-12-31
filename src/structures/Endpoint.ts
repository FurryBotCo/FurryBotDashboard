import type { RouteDefinition } from './decorators/Route';
import type { Server } from './Server';
import { Collection } from '@augu/collections';

/** Represents a endpoint to interact with the dashboard */
export class Endpoint {
  /** The server instance */
  public server!: Server;

  /** The prefix of this Endpoint to merge with routes */
  public prefix: string;

  /** List of routes available to this [Endpoint] */
  public routes: Collection<string, RouteDefinition>;

  /**
   * Static function to merge the [endpoint]'s prefix to the [path]'s prefix
   * @param endpoint The endpoint to merge
   * @param path The path to merge
   */
  static _mergePrefix(endpoint: Endpoint, path: string) {
    if (endpoint.prefix === path) return endpoint.prefix;
    return `${endpoint.prefix === '/' ? '' : endpoint.prefix}${path}`;
  }

  /**
   * Creates a new [Endpoint] instance
   * @param prefix The prefix to set
   */
  constructor(prefix: string) {
    this.prefix = prefix;
    this.routes = new Collection();
  }

  /**
   * Initialises this [Endpoint] to populate [Endpoint.server]
   * @param server The server running
   */
  init(server: Server) {
    this.server = server;
    return this;
  }

  /**
   * Appends all the routes from this [Endpoint] instance and adds them
   * @param routes The routes to append
   */
  append(routes: RouteDefinition[]) {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      const path = Endpoint._mergePrefix(this, route.endpoint);

      this.routes.emplace(path, route);
    }
  }
}
