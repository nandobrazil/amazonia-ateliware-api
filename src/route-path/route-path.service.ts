import { Injectable } from '@nestjs/common';
import { CreateRoutePathDto } from './dto/create-route-path.dto';
import { PrismaService } from '../database/prisma.service';
import { RoutePathEntity } from './entities/route-path.entity';

@Injectable()
export class RoutePathService {
  constructor(private readonly prisma: PrismaService) {}

  createMany(routeId: number, createRoutePathDto: CreateRoutePathDto[]) {
    const data = [];
    createRoutePathDto.forEach(async (routePath) => {
      data.push(await this.create(routeId, routePath));
    });
    return data;
  }

  async create(
    routeId: number,
    createRoutePathDto: CreateRoutePathDto,
  ): Promise<CreateRoutePathDto> {
    const data = {
      ...createRoutePathDto,
      DateCreated: new Date(),
        route: {
        connect: {
          id: routeId,
        },
      },
    };
    const createdRoutePath = await this.prisma.routePath.create({ data });
    return {
      ...createdRoutePath,
    };
  }
}
