import winston from "winston";

const format = winston.format.combine(
  winston.format((info) => ({ ...info, level: info.level.toUpperCase() }))(),
  winston.format.colorize({
    all: true,
  }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(
    ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`,
  ),
);

const logger = winston.createLogger({
  level: process.env.NODE_ENV !== "production" ? "info" : "debug",
  transports: [new winston.transports.Console({ format })],
});

export default logger;