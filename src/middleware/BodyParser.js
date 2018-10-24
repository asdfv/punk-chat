import KoaBodyParser from 'koa-bodyparser';

const parserOptions = {
    enableTypes: ['json'],
    jsonLimit: '5mb',
    strict: true
};

/**
 * Configured Koa-bodyParser
 */
export default KoaBodyParser(parserOptions);