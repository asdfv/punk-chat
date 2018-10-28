/**
 * Http-header title
 */
const RESPONSE_TIME = 'response-time';

/**
 * Set header with calculated response time
 */
const responseTimeHeader = async (ctx, next) => {
    const start = new Date();
    await next();
    const time = new Date() - start;
    ctx.set(RESPONSE_TIME, `${time} ms`);
};

export default { responseTimeHeader, RESPONSE_TIME }
