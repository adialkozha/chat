import { ConnectionOptions } from 'typeorm';

const config:ConnectionOptions ={
    type: 'postgres',
    host: 'localhost',
    port: parseInt(process.env.DB_PORT),
    username: 'adil',
    password: 'adil',
    database: 'chat',
    entities: [__dirname+'/*/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname+'/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations'
    }
};

export default config;