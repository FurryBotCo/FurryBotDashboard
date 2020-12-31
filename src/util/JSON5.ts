import { readFileSync } from 'fs';
import json5 from 'json5';

const parse = (module: any, filename: string) => {
  const content = readFileSync(filename, 'utf8');

  try {
    module.exports = json5.parse(content);
  } catch(ex) {
    ex.message = `${filename}: ${ex.message}`;
    throw ex;
  }
};

require.extensions['.json5'] = parse;
require.extensions['.json'] = parse;
