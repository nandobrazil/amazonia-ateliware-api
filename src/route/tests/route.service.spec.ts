import { Test, TestingModule } from '@nestjs/testing';
import { RouteService } from '../route.service';
import { PrismaService } from '../../database/prisma.service';
import { routeEntityMock } from './route.mock';
import {
  listRouteEntityMock,
  listRouteMock,
  routePathEntityMock,
} from './list-route.mock';
import { DijkstraService } from '../../shared/services/dijkstra.service';
import { mockAuthRequest } from './auth-request.mock';
import { MockioApiService } from '../../shared/services/mockio-api.service';
import { createRouteMock } from './create-route.mock';
import { destinationPath, originPath } from './dijkstra.mock';
import { graphMock } from './external-api.mock';

describe('RouteService', () => {
  let service: RouteService;
  let dijkstraService: DijkstraService;

  const mockPrismaService = {
    route: {
      create: jest.fn().mockResolvedValue(routeEntityMock),
      findMany: jest.fn().mockResolvedValue(listRouteEntityMock),
    },
    routePath: {
      create: jest.fn().mockResolvedValue(routePathEntityMock),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RouteService,
        MockioApiService,
        DijkstraService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();
    dijkstraService = module.get<DijkstraService>(DijkstraService);
    service = module.get<RouteService>(RouteService);
  });

  it('should return listRoute in findAll', async () => {
    const routes = await service.findAll(mockAuthRequest);
    expect(routes).toEqual(listRouteMock);
  });

  it('should return formatedDate in formatDate', async () => {
    const date = new Date('2023-10-16T02:55:18.158Z');
    expect(service.formatDate(date)).toEqual('15/10/2023 23:55');
  });

  it('should return ListRouteDto in create', async () => {
    const mockDijkstra = jest.spyOn(dijkstraService, 'dijkstra');
    mockDijkstra.mockReturnValueOnce(originPath);
    mockDijkstra.mockReturnValueOnce(destinationPath);

    const route = await service.create(mockAuthRequest, createRouteMock);
    expect(mockDijkstra).toHaveBeenCalledWith(
      graphMock,
      createRouteMock.origin,
      createRouteMock.packageCollection,
    );
    expect(mockDijkstra).toHaveBeenCalledWith(
      graphMock,
      createRouteMock.packageCollection,
      createRouteMock.destination,
    );
    expect(route).toEqual(listRouteMock[0]);
  });
});
