import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from '../../database/prisma.service';
import { userEntityMock } from './user.mock';
import { createUserMock } from './create-user.mock';

describe('UserService', () => {
  let service: UserService;

  const mockPrismaService = {
    user: {
      create: jest.fn().mockResolvedValue(userEntityMock),
      findUnique: jest.fn().mockResolvedValue(userEntityMock),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it('should return user in findByUsername', async () => {
    const user = await service.findByUsername(userEntityMock.username);
    expect(user).toEqual(userEntityMock);
  });

  it('should return error if user exist', async () => {
    await expect(service.create(createUserMock)).rejects.toThrowError();
  });

  it('should return userCreated', async () => {
    mockPrismaService.user.findUnique = jest.fn().mockResolvedValue(null);
    expect(await service.create(createUserMock)).toEqual({ ... userEntityMock, password: undefined });
  });
});
