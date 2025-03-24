import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: './database/my-db.sqlite3',
  autoLoadEntities: true,
  synchronize: true, //TODO: remove in production
};
