import loggerFunc from '../helpers/Logger';

const log = loggerFunc(module);

const RESPONSE_TIME = 'response-time';

/**
 * Set header with calculated response time
 */
const header = async (ctx, next) => {
    const start = new Date();
    await next();
    const time = new Date() - start;
    ctx.set(RESPONSE_TIME, `${time} ms`);
};

/**
 * Logger for log request/response
 */
const logger = async (ctx, next) => {
    await next();
    const { method, url, status, response, request } = ctx;
    const time = response.get(RESPONSE_TIME);
    const reqBody = JSON.stringify(request.body);
    const resBody = JSON.stringify(response.body) || 'missing body';
    log.info(`<-- [${method}] ${url} ${reqBody}  --> [${status}] ${resBody}, time: ${time}`);
};

export default { header, logger };
