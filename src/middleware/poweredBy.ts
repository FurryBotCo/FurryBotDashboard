import type { Middleware } from '../structures';

const mod: Middleware = () => {
  return (_, res, next) => {
    res.setHeader('X-Powered-By', 'cute furries doing cute things (https://github.com/FurryBotCo/FurryBotDashboard)');
    next();
  };
};

export default mod;
