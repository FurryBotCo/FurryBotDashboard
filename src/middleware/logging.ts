import { Middleware, Logger } from '../structures';
import onFinished from 'on-finished';
import leeks from 'leeks.js';

function getRequestDuration(start: [number, number]) {
  const difference = process.hrtime(start);
  return (difference[0] * 1e9 + difference[1]) / 1e6;
}

const mod: Middleware = () => {
  const logger = new Logger('Requests');

  return (req, res, next) => {
    next(); // Let it continue

    const start = process.hrtime();
    onFinished(res, (error, res) => {
      let color;

      // this is gonna get real messy...
      if (res.statusCode >= 500)
        color = leeks.colors.red;
      else if (res.statusCode >= 400)
        color = leeks.colors.yellow;
      else if (res.statusCode >= 300)
        color = leeks.colors.grey;
      else if (res.statusCode >= 200)
        color = leeks.colors.green;
      else
        color = leeks.colors.grey;

      const time = color(`~${getRequestDuration(start).toFixed}ms`);
      logger.request(`<- ${req.method.toUpperCase()} ${req.url} @ ${req.ip} | ${time}`);
    });
  };
};

export default mod;
