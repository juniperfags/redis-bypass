import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WEB_SOCKET_PROVIDER, WEB_SOCKET_URI } from 'src/utils/strings/ws';
import { WebSocket } from 'ws';

@Global()
@Module({})
export class SocketModule {
  static forRoot(): DynamicModule {
    return {
      module: SocketModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: WEB_SOCKET_PROVIDER,
          useFactory: (configService: ConfigService) => {
            const ws = new WebSocket(configService.get<string>(WEB_SOCKET_URI));
            return ws;
          },
          inject: [ConfigService],
        },
      ],
      exports: [WEB_SOCKET_PROVIDER],
    };
  }
}
