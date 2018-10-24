import BodyParser from './middleware/BodyParser';
import Koa from 'koa';

import chatRouter from './components/chat/Router';
import Db from './db/Mongo';
import Error from './middleware/Error';
import ResponseTime from './middleware/ResponseTime';


/**
 * Koa-application
 */
export default class Application {
    constructor(port) {
        this.port = port;
        this.app = new Koa();
        this.db = new Db();
    }

    /**
     * Start application
     */
    async start() {
        this.addMiddleware();
        this.addErrorHandling();
        await this.db.connect();
        await this.app.listen(this.port);
    }

    addMiddleware() {
        const { app } = this;
        app.use(Error.emitter);
        app.use(ResponseTime.logger);
        app.use(ResponseTime.header);
        app.use(BodyParser);
        app.use(chatRouter.routes());
        app.use(chatRouter.allowedMethods());
    }

    addErrorHandling() {
        this.app.on(Error.ERROR, Error.handler);
    }
}
