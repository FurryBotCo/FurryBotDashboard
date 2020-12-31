import type { Middleware } from '../structures';

const mod: Middleware = () => {
  return (_, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-COntrol-Allow-Origin', '*');

    next();
  };
};

export default mod;
