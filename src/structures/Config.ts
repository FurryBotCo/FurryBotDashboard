import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';

/** Represents what the `config.json` should look like */
export interface Configuration {
  /**
   * The port to connect to the world!
   */
  port: number;

  /**
   * SSL configuration for the Dashboard
   */
  ssl?: SSLConfig;
}

/** Represents what [Configuration.ssl] is */
export interface SSLConfig {
  /**
   * Path to the certificate file in PEM format
   */
  cert: string;

  /**
   * Path to the private key file in PEM format
   */
  key: string;

  /**
   * Overrides the default trusted CAs
   */
  ca?: string;
}

/** Represents a class to handle configuration */
export default class Config {
  /** Represents the configuration cache available */
  private cache!: Configuration;

  /**
   * Loads the configuration file and populates [Config.cache]
   */
  load() {
    if (!existsSync(join(__dirname, '..', 'config.json')))
      throw new SyntaxError(`Missing config.json in '${join(__dirname, '..', 'config.json')}'`);

    const config: Configuration = require('../config.json');

    this.cache = config;
    return config;
  }

  /**
   * Gets a key in the configuration file, if it doesn't exist, it'll use the
   * [defaultValue] provided. The key can be nested from objects using dot notation,
   * so `ssl.cert` will look for `cert` in the `ssl` object.
   *
   * @param key The key to find
   * @param defaultValue The default value
   * @returns The property found or the default value provided
   */
  get<T>(key: string, defaultValue: T): T;

  /**
   * Gets a key in the configuration file, if it doesn't exist,
   * it'll return `null`. The key can be nested from objects using dot notation,
   * so `ssl.cert` will look for `cert` in the `ssl` object.
   *
   * @param key The key to find
   * @returns The property found or `null` if nothing was found
   */
  get<T>(key: string): T | null;

  /**
   * Gets a key in the configuration file, if it doesn't exist, it'll use the
   * [defaultValue] provided or `null` if no [defaultValue] was specified.
   * The key can be nested from objects using dot notation, so `ssl.cert` will look for `cert` in the `ssl` object.
   *
   * @param key The key to find the property
   * @param defaultValue A specified default value if the property isn't found
   * @returns The property found, if [defaultValue] is specified, it'll use that if it's not found, or `null`
   * if [defaultValue] isn't specified
   */
  get<T>(key: string, defaultValue?: T) {
    const nodes = key.split('.');
    let prop: any = this.cache;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      try {
        prop = prop[node];
      } catch {
        prop = '<not found>';
        break;
      }
    }

    if (prop === '<not found>') throw new TypeError(`Couldn't find anything in nodes '${nodes.join('.')}'`);

    if (defaultValue) {
      return (prop === null || prop === void 0) ? defaultValue : prop;
    } else {
      return (prop === null || prop === void 0) ? null : prop;
    }
  }

  /**
   * Sets a property of a value and dumps it to `config.yml`
   * @param key The key to set the value
   * @param value The value to set
   */
  set<K extends keyof Configuration>(key: K, value: Configuration[K]) {
    const cache = this.cache[key];
    if (!cache) throw new TypeError(`Key '${key}' doesn't exist`);

    this.cache[key] = value;
    const config = JSON.stringify(this.cache, null, 4);

    writeFileSync(join(__dirname, '..', 'config.json'), config);
  }
}
