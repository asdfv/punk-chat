import Application from './app';
import config from './config'

let app = new Application();
app.expressApp.listen(config.port,
                      config.host,
                      () => console.log(`App listening at port ${config.port}`),
);
