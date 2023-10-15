import { Injectable } from '@nestjs/common';
import { CreateRoutePathDto } from './dto/create-route-path.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class RoutePathService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    routeId: number,
    createRoutePathDto: CreateRoutePathDto,
  ): Promise<CreateRoutePathDto> {
    const data = {
      ...createRoutePathDto,
      dateCreated: new Date(),
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
