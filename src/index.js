import 'babel-polyfill';

import Application from './app';
import config from './config';
import loggerFunc from './helpers/Logger';
const logger = loggerFunc(module);

const port = config.applicationPort;
const app = new Application(port);

app.start(() => logger.info(`App start on port ${port}`));
