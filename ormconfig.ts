// eslint-disable-next-line import/no-unresolved, import/extensions, @moneteam/nestjs/injectable-should-be-provided
import './src/app.polyfill';

import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { SnakeNamingStrategy } from './src/snake-naming.strategy';

const configs: TypeOrmModuleOptions & { seeds: string[]; factories: string[] } =
  {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ['src/modules/**/data/**/*.entity{.ts,.js}'],
    migrations: ['src/modules/database/migrations/*{.ts,.js}'],
    seeds: ['src/modules/database/seeds/**/*{.ts,.js}'],
    factories: ['src/modules/database/factories/**/*{.ts,.js}'],
  };

module.exports = configs;
