import { Inject, Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { RedisClientType } from 'redis';
import { Socket } from 'socket.io-client';
import {
  REDIS_CLIENT_PROVIDER,
  WEB_SOCKET_PROVIDER,
} from 'src/utils/strings/ws';

@Injectable()
export class AppService {
  constructor(
    @Inject(REDIS_CLIENT_PROVIDER)
    private readonly redisClient: RedisClientType<any, any>,
    @Inject(WEB_SOCKET_PROVIDER) private readonly ioClient: Socket,
  ) {}

  checkRedisConnection(): Observable<string> {
    return from(this.redisClient.PING()).pipe(map((val) => val));
  }
}
