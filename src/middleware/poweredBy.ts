import type { Middleware } from '../structures';

const mod: Middleware = () => {
  return (_, res, next) => {
    res.setHeader('X-Powered-By', '2 cute furries (https://github.com/FurryBotCo/FurryBotDashboard)');

    next();
  };
};

export default mod;
