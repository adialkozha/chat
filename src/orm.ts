import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config()
class OrmConfig {
    constructor (private readonly configService:ConfigService) {}
    public ormconfig: TypeOrmModuleOptions ={ 
        type:'postgres',
        host: this.configService.get<string>('DB_HOST'),
        port: this.configService.get<number>('DB_PORT'),
        username: this.configService.get<string>('DB_USERNAME'),
        password: this.configService.get<string>('DB_PASSWORD'),
        database: this.configService.get<string>('DB_DATABASE'),
        entities:[__dirname+'/*/*.entity{.ts,.js}'],
        synchronize: false,
        migrations: [__dirname+'/migrations/**/*{.ts,.js}'],
        cli: {
            migrationsDir: 'src/migrations'
        }
    }
}
const conf = new OrmConfig(new ConfigService);
export default conf.ormconfig;
