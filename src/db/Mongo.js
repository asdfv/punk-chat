import mongoose from 'mongoose';

import config from '../config';
import loggerFunc from '../helpers/Logger';

const log = loggerFunc(module);

/**
 * Class represent MongoDB
 */
export default class Mongo {
    constructor() {
        this.url = config.mongoUrl;
        this.reconnectTimeout = config.mongoReconnectTimeout;
        this.options = {
            useNewUrlParser: true,
            auto_reconnect: true
        };
    }

    /**
     * Setup and connect to MongoDB
     */
    async connect() {
        const { url, options, reconnectTimeout } = this;
        this.addHandlers(url, options, reconnectTimeout);
        await mongoose.connect(url, options);
    }

    addHandlers(url, options, reconnectTimeout) {
        mongoose.connection.on('connected', () => log.info(`Mongoose connected successfully: ${url}`));
        mongoose.connection.on('error', error => {
            log.error(`Mongoose connection error: ${error}`);
            mongoose.disconnect();
        });
        mongoose.connection.on('disconnected', () => {
            log.warn(`Mongoose disconnected, try to reconnect after ${reconnectTimeout} ms`);
            setTimeout(() => mongoose.connect(url, options), reconnectTimeout);
        });
    }
}
