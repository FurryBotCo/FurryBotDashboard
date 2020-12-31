import { createElement } from 'react';
import DOMServer from 'react-dom/server';
import { join } from 'path';

/**
 * Rendering engine for React
 * @param req The request to add to the props object
 * @param res The response to add to the props object
 * @param path The path to the component
 * @param props Any additional props, if any to add to the component
 */
export default function render<Props extends object = {}>(path: string, props?: Props) {
  if (!path.endsWith('.js')) path += '.js';

  const filePath = join(process.cwd(), 'views', path);
  let html = '<!DOCTYPE html>';
  const component = require(filePath);

  if (!component.default) throw new SyntaxError(`Component "${path}" didn't export a default port.`);
  html += DOMServer.renderToStaticMarkup(createElement(component.default, props ?? {}));

  return html;
}
