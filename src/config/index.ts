import * as joi from '@hapi/joi';
export enum ConfigRaw {
    PORT = 'PORT',
    DB_HOST = 'DB_HOST',
    DB_PORT = 'DB_PORT',
    DB_USERNAME = 'DB_USERNAME',
    DB_PASSWORD = 'DB_PASSWORD',
    DB_DATABASE = 'DB_DATABASE'
}

export const configPattern = () => ({
    port: process.env[ConfigRaw.DB_PORT],
    db: {
        host: process.env[ConfigRaw.DB_HOST],
        port: process.env[ConfigRaw.DB_PORT],
        username: process.env[ConfigRaw.DB_USERNAME],
        password: process.env[ConfigRaw.DB_PASSWORD],
        database: process.env[ConfigRaw.DB_DATABASE],
    }
})

export const configValidation = joi.object({
    [ConfigRaw.PORT]: joi.number().default(3000),
    [ConfigRaw.DB_HOST]: joi.string().default('localhost'),
    [ConfigRaw.DB_PORT]: joi.number().default(5432),
    [ConfigRaw.DB_USERNAME]: joi.string().required(),
    [ConfigRaw.DB_PASSWORD]: joi.string().required(),
    [ConfigRaw.DB_DATABASE]: joi.string().required(),
});