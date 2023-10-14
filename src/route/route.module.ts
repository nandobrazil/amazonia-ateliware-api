import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { MockioApiService } from '../shared/services/mockio-api.service';
import { DijkstraService } from '../shared/services/dijkstra.service';
import { PrismaService } from '../database/prisma.service';
import { RoutePathService } from '../route-path/route-path.service';

@Module({
  controllers: [RouteController],
  providers: [
    RouteService,
    DijkstraService,
    MockioApiService,
    PrismaService,
    RoutePathService,
  ],
})
export class RouteModule {}
