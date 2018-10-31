import 'babel-polyfill';

import Application from './app';
import config from './config';
import loggerFunc from './helpers/Logger';

const log = loggerFunc(module);
const port = config.applicationPort;
const app = new Application(port);

/**
 * Entry point of the application
 */
app.start()
    .then(() => log.info(`App started on port ${port}`))
    .catch(error => log.error(`Error while starting app, ${error.stack}`));
