import loggerFunc from '../helpers/Logger';
import ResponseTimeHeader from './Header'

const log = loggerFunc(module);

/**
 * Logger for log request/response
 */
export default async (ctx, next) => {
    await next();
    const { method, url, status, response, request } = ctx;
    const time = response.get(ResponseTimeHeader.RESPONSE_TIME);
    const reqBody = JSON.stringify(request.body);
    const resBody = JSON.stringify(response.body);
    log.info(`<-- [${method}] ${url} ${reqBody || ''}, time: ${time}  --> [${status}] ${resBody || ''}`);
};
