import loggerFunc from '../helpers/Logger';
const log = loggerFunc(module);

const RESPONSE_TIME = 'response-time';

const setHeader = async (ctx, next) => {
    const start = new Date();
    await next();
    const time = new Date() - start;
    ctx.set(RESPONSE_TIME, `${time} ms`);
};

const logRequest = async (ctx, next) => {
    await next();
    const time = ctx.response.get(RESPONSE_TIME);
    log.info(`[${ctx.method}] ${ctx.url}, time: ${time}`);
};

export default { setHeader, logRequest }
