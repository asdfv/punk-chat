import BodyParser from './middleware/BodyParser';
import Koa from 'koa';

import messageRouter from './components/message/Router';
import Db from './db/Mongo';
import Error from './middleware/Error';
import generalChatRouter from './components/generalChat/Router';
import requestLogger from './middleware/RequestLogger';
import Header from './middleware/Header';
import userRouter from './components/user/Router';
import GeneralChatController from './components/generalChat/Controller';

/**
 * Koa-application
 */
export default class Application {
    constructor(port) {
        this.port = port;
        this.app = new Koa();
        this.db = new Db();
        this.generalChatController = new GeneralChatController();
    }

    /**
     * Start application
     */
    async start() {
        const { app, port, db, generalChatController } = this;
        this.addMiddleware();
        this.addErrorHandling();
        await db.connect();
        await app.listen(port);
        await generalChatController.createIfNotExists();
    }

    addMiddleware() {
        const { app } = this;
        app.use(Error.emitter);
        app.use(requestLogger);
        app.use(Header.responseTimeHeader);
        app.use(BodyParser);
        app.use(messageRouter.routes());
        app.use(messageRouter.allowedMethods());
        app.use(generalChatRouter.routes());
        app.use(generalChatRouter.allowedMethods());
        app.use(userRouter.routes());
        app.use(userRouter.allowedMethods());
    }

    addErrorHandling() {
        this.app.on(Error.ERROR, Error.handler);
    }
}
