import pino from 'pino';

const isDevelopment = process.env.NODE_ENV === 'development';
const ENABLE_PINO_PRETTY = isDevelopment;

const pinoPrettyTransport = {
  target: 'pino-pretty',
  options: {
    colorize: true,
    messageKey: 'message',
    timestampKey: '@timestamp',
    translateTime: true,
    destination: 1,
    ignore: 'pid,source_host',
  },
};

export const logger = pino(
  {
    transport: ENABLE_PINO_PRETTY ? pinoPrettyTransport : undefined,
    timestamp: () => `,"@timestamp":"${new Date(Date.now()).toISOString()}"`,
    messageKey: 'message',
    name: 'distributor-frontend-gateway',
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },

      bindings: (bindings) => {
        return {
          pid: bindings.pid,
          source_host: isDevelopment ? 'localhost' : bindings.hostname,
        };
      },
    },
  },
  pino.destination(1)
);
