import Koa from 'koa';

import Error from './middleware/Error';
import ResponseTime from './middleware/ResponseTime';
import Mongo from './db/Mongo';

/**
 * Koa-application
 */
export default class Application {
    constructor(port) {
        this.port = port;
        this.app = new Koa();
        this.db = new Mongo();
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
        app.use(ResponseTime.logRequest);
        app.use(ResponseTime.setHeader);
        app.use(ctx => ctx.body = 'Hello!');
    }

    addErrorHandling() {
        this.app.on(Error.ERROR, Error.handler);
    }
}
