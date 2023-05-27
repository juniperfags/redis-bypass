import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import RedisModule from './modules/redis/redis.module';
import { SocketModule } from './modules/socket/socket.module';
import configuration from './config';
import {
  MESSAGE_CHANNEL,
  REDIS_CLIENT_PROVIDER,
  REDIS_HASH_KEY,
  WEB_SOCKET_PROVIDER,
} from 'src/utils/strings/ws';
import { WebSocket } from 'ws';

import { RedisClientType, RedisFunctions, RedisModules } from 'redis';
import { IWebSocketDataSource } from 'src/utils/interfaces/ws';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
    RedisModule.forRoot(),
    SocketModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    @Inject(WEB_SOCKET_PROVIDER)
    private readonly socket: WebSocket,
    @Inject(REDIS_CLIENT_PROVIDER)
    private readonly client: RedisClientType<RedisModules, RedisFunctions>,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.socket.on(MESSAGE_CHANNEL, (_) => {
      const value = JSON.parse(_.toString()) as IWebSocketDataSource<string>;

      this.client.hSet(
        this.configService.get(REDIS_HASH_KEY),
        value.key,
        _.toString(),
      );
    });
  }
}
