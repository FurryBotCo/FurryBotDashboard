import { existsSync, promises as fs } from 'fs';
import { Server, Logger } from './structures';
import { join } from 'path';
import json5 from 'json5';

import './util/JSON5';

const logger = new Logger('Main');
const configPath = join(__dirname, 'config.json');

async function main() {
  logger.info('Now finding config.json in build/...');
  if (!existsSync(configPath)) {
    try {
      const defaultConfig = json5.stringify({
        port: 3621
      }, null, 4);

      await fs.writeFile(configPath, defaultConfig);
      logger.info(`Created "config.json" in ${configPath}.`);
    } catch(ex) {
      logger.error('Unable to write the default config', ex);
      process.exit(1);
    }
  }

  const server = new Server();
  try {
    await server.init();
  } catch(ex) {
    logger.error('Unable to boot up server', ex);
    process.exit(1);
  }

  process.on('SIGINT', () => {
    server.close();
    process.exit(1);
  });
}

main();
