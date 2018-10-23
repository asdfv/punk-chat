import 'babel-polyfill';

import Application from './app';
import config from './config';
import loggerFunc from './helpers/Logger';

const log = loggerFunc(module);
const port = config.applicationPort;
const app = new Application(port);

app.start().catch(error => log.error(`Error while starting app, ${error}`));

log.info(`App start on port ${port}`);
