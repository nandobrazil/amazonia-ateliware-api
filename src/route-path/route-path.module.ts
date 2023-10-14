import { Module } from '@nestjs/common';
import { RoutePathService } from './route-path.service';

@Module({
  providers: [RoutePathService],
})
export class RouteModule {}
