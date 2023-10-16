import { Test, TestingModule } from '@nestjs/testing';
import { RouteService } from './route.service';
import { userEntityMock } from "../user/tests/user.mock";
import { PrismaService } from "../database/prisma.service";

describe('RouteService', () => {
  let service: RouteService;

  const mockPrismaService = {
    user: {
      create: jest
        .fn()
        .mockResolvedValue({ ...userEntityMock, password: undefined }),
      findUnique: jest.fn().mockResolvedValue(userEntityMock),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RouteService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();
    service = module.get<RouteService>(RouteService);
  });

});
