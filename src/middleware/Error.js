import loggerFunc from '../helpers/Logger';
const logger = loggerFunc(module);

/**
 * Emit an error if it occurs in the chain of middleware
 */
const emitter = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit(ERROR, err, ctx);
    }
};

/**
 * Handle error emitted by @emitter
 */
const handler = (err, ctx) => {
    logger.error(err.stack);
    ctx.body = 'Something broke!';
};

const ERROR = 'error';

export default { emitter, handler, ERROR }
