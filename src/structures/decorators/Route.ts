import type { Response, Request } from 'express';

type MaybePromise<T> = T | Promise<T>;
const SYMBOL = Symbol('$routes');

/** Represents a route */
export interface RouteDefinition {
  /**
   * The runner method to run when we hit this specific endpoint
   * @param req The request
   * @param res The response
   */
  run(req: Request, res: Response): MaybePromise<void>;

  /** The endpoint, this is merged with [Endpoint._mergePrefix] */
  endpoint: string;
}

/**
 * Returns all of the route definitions from the specified [target]
 * @param target The target
 */
export function getRouteDefinitions(target: any) {
  if (target.constructor === null) return [];

  const definitions = target.constructor[SYMBOL] as RouteDefinition[];
  if (!Array.isArray(definitions)) return [];

  return definitions;
}

/**
 * Decorator to indicate this method as a "Route"
 * @param endpoint The endpoint path to use
 */
export function Route(endpoint: string): MethodDecorator {
  return (target, prop, descriptor) => {
    const property = String(prop);
    if ((<any> target).prototype !== undefined) throw new TypeError(`Method "${target.constructor.name}#${property}" is static`);
    if (!target.constructor[SYMBOL]) target.constructor[SYMBOL] = [];

    (target.constructor[SYMBOL] as RouteDefinition[]).push({
      run: descriptor.value as any,
      endpoint
    });
  };
}
