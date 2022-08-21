import { Global, Module } from '@nestjs/common';

import { AppConfigService } from './config.service';

const providers = [AppConfigService];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class AppConfigModule {}
