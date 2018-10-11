import Koa from 'koa';

import Error from './middleware/Error';
import ResponseTime from './middleware/ResponseTime';

/**
 * Koa-application
 */
export default class Application {
    constructor(port) {
        this.port = port;
        this.app = new Koa;
        this.addMiddleware();
        this.addErrorHandling();
    }

    /**
     * Start application
     * @param callback - callback after start success
     */
    start(callback) {
        this.app.listen(this.port, () => callback());
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
