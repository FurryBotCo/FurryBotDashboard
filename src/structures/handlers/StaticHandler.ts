import { Server, Logger } from '..';
import { promises as fs } from 'fs';
import { join } from 'path';
import express from 'express';
import postcss from 'postcss';

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
    this.logger.info('Compiling .scss files and adding in /static as a path...');
    this.server.app.use(express.static(this.directory, { maxAge: '90d' }));

    const processor = postcss([
      require('autoprefixer'),
      require('@csstools/postcss-sass'),
      require('tailwindcss')
    ]);

    const style = await fs.readFile(join(this.directory, 'scss', 'style.scss'), 'utf8');
    const result = await processor.process(style, {
      to: join(this.directory, 'css', 'style.css')
    });

    const warnings = result.warnings();
    this.logger.info(`Successfully compiled the stylesheet! Received ${warnings.length} warnings.`);

    if (warnings.length > 0) this.logger.warn(warnings);
  }
}
