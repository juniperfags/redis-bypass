import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { createClient } from 'redis';
import { REDIS_CLIENT_PROVIDER, REDIS_CLIENT_URI } from 'src/utils/strings/ws';

@Global()
@Module({})
class RedisModule {
  static forRoot(): DynamicModule {
    return {
      module: RedisModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: REDIS_CLIENT_PROVIDER,
          useFactory: async (configService: ConfigService) => {
            const client = createClient({
              url: configService.get(REDIS_CLIENT_URI),
            });

            await client.connect();

            return client;
          },
          inject: [ConfigService],
        },
      ],
      exports: [REDIS_CLIENT_PROVIDER],
    };
  }
}

export default RedisModule;
