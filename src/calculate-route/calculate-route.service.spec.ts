import { Test, TestingModule } from '@nestjs/testing';
import { CalculateRouteService } from './calculate-route.service';

describe('CalculateRouteService', () => {
  let service: CalculateRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculateRouteService],
    }).compile();

    service = module.get<CalculateRouteService>(CalculateRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
