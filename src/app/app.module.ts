import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'src/config/configuration';
import { validateSchema } from 'src/config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/env/${
        process.env.NODE_ENV
      }.env`,
      isGlobal: true,
      load: [configuration],
      validationSchema: validateSchema,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class MainAppModule {}
