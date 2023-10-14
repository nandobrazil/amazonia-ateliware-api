import { Test, TestingModule } from '@nestjs/testing';
import { CalculateRouteController } from './calculate-route.controller';
import { CalculateRouteService } from './calculate-route.service';

describe('CalculateRouteController', () => {
  let controller: CalculateRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculateRouteController],
      providers: [CalculateRouteService],
    }).compile();

    controller = module.get<CalculateRouteController>(CalculateRouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
