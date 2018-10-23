import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

/**
 * Customized winston logger
 */
const logger = callingModule => createLogger({
    format: combine(
        timestamp(),
        logFormat(callingModule)
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log', level: 'error' })
    ]
});

const logFormat = (callingModule) => {
    return printf(info => `${info.timestamp} [${getLabel(callingModule)}] ${info.level.toLocaleUpperCase()}: ${info.message}`);
};

const getLabel = callingModule => callingModule.filename.replace(/^.*[\\/]/, '');

export default logger
