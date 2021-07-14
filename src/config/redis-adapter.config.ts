import * as joi from '@hapi/joi';
export enum ConfigRaw {
    REDIS_PORT = 'REDIS_PORT',
    REDIS_HOST = 'REDIS_HOST',
}

export const configPattern = () => ({
    port: process.env[ConfigRaw.REDIS_PORT],
    host: process.env[ConfigRaw.REDIS_PORT]
})

export const configValidation = joi.object({
    [ConfigRaw.PORT]: joi.number().default(3000),
    [ConfigRaw.DB_HOST]: joi.string().default('localhost'),
    [ConfigRaw.DB_PORT]: joi.number().default(5432),
    [ConfigRaw.DB_USERNAME]: joi.string().required(),
    [ConfigRaw.DB_PASSWORD]: joi.string().required(),
    [ConfigRaw.DB_DATABASE]: joi.string().required(),
});