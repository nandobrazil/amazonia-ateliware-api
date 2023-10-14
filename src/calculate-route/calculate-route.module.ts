import { Module } from '@nestjs/common';
import { CalculateRouteService } from './calculate-route.service';
import { CalculateRouteController } from './calculate-route.controller';

@Module({
  controllers: [CalculateRouteController],
  providers: [CalculateRouteService],
})
export class CalculateRouteModule {}
