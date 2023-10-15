import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { RouteEntity } from './entities/route.entity';
import { PrismaService } from '../database/prisma.service';
import { DijkstraService } from '../shared/services/dijkstra.service';
import { MockioApiService } from '../shared/services/mockio-api.service';
import { AuthRequest } from '../auth/models/AuthRequest';
import { RoutePathService } from '../route-path/route-path.service';
import { ListRouteDto } from './dto/list-route.dto';
import { CreateRoutePathDto } from '../route-path/dto/create-route-path.dto';
import { ListRoutePathDto } from '../route-path/dto/list-route-path.dto';

@Injectable()
export class RouteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dijkstraService: DijkstraService,
    private readonly routePathService: RoutePathService,
    private readonly mockioApi: MockioApiService,
  ) {}

  async create(
    req: AuthRequest,
    createRouteDto: CreateRouteDto,
  ): Promise<ListRouteDto> {
    const graph = await this.mockioApi.fetchData();
    const originRoute = this.dijkstraService.dijkstra(
      graph,
      createRouteDto.origin,
      createRouteDto.packageCollection,
    );
    const destinationRoute = this.dijkstraService.dijkstra(
      graph,
      createRouteDto.packageCollection,
      createRouteDto.destination,
    );

    const data: RouteEntity = {
      ...createRouteDto,
      dateCreated: new Date(),
      timeRoute: originRoute?.time + destinationRoute?.time,
      userId: req.user.id,
    };

    const createdRoute = await this.prisma.route.create({ data });
    const originPaths: CreateRoutePathDto[] = originRoute.path.map(
      (path, index) => ({
        coordinate: path,
        origin: true,
        order: index + 1,
      }),
    );
    const destinationPaths: CreateRoutePathDto[] = destinationRoute.path.map(
      (path, index) => ({
        coordinate: path,
        origin: false,
        order: index + 1,
      }),
    );
    const routePaths = [...originPaths, ...destinationPaths];
    if (routePaths && routePaths.length > 0) {
      routePaths.map(async ({ coordinate, origin, order }) => {
        await this.prisma.routePath.create({
          data: {
            coordinate,
            origin,
            order,
            dateCreated: new Date(),
            route: {
              connect: {
                id: createdRoute.id,
              },
            },
          },
        });
      });
    }
    const routePathDto: ListRoutePathDto = {
      origin: routePaths
        .filter((path) => path.origin)
        .map((path) => path.coordinate),
      destination: routePaths
        .filter((path) => !path.origin)
        .map((path) => path.coordinate),
    };
    const {
      id,
      origin,
      destination,
      packageCollection,
      dateCreated,
      timeRoute,
    } = createdRoute;
    return {
      id,
      origin,
      destination,
      timeRoute,
      packageCollection,
      dateCreated: this.formatDate(dateCreated),
      routePaths: routePathDto,
    };
  }

  async findAll(req: AuthRequest): Promise<ListRouteDto[]> {
    const listRouteEntity = await this.prisma.route.findMany({
      include: {
        routePaths: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      where: { userId: req.user.id },
      orderBy: {
        id: 'asc',
      },
    });
    return listRouteEntity?.map((route) => {
      const routePathDto: ListRoutePathDto = {
        origin: route.routePaths
          .filter((path) => path.origin)
          .map((path) => path.coordinate),
        destination: route.routePaths
          .filter((path) => !path.origin)
          .map((path) => path.coordinate),
      };
      return {
        id: route.id,
        origin: route.origin,
        destination: route.destination,
        packageCollection: route.packageCollection,
        timeRoute: route.timeRoute,
        dateCreated: this.formatDate(route.dateCreated),
        routePaths: routePathDto,
      };
    });
  }

  formatDate(date: Date): string {
    const hour = `${date.getHours()}:${date.getMinutes()}`;
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${hour}`;
  }
}
