import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JobController } from './job.controller';
import {
  userAgent,
  userAgentMiddleware,
  UserAgentOptions,
} from 'src/middleware/user-agent.middleware';
import { AuthMiddleWare } from 'src/middleware/auth.middleware';

@Module({
  controllers: [JobController],
  providers: [
    {
      provide: UserAgentOptions,
      useValue: {
        accepted: ['chrome', 'firefox', 'postman'],
      },
    },
  ],
})
export class JobModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(userAgentMiddleware)
      .exclude({ path: 'job/refs', method: RequestMethod.POST })
      .forRoutes('job');
  }
}
