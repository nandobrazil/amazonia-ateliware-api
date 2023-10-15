import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { RouteEntity } from './entities/route.entity';
import { PrismaService } from '../database/prisma.service';
import { DijkstraService } from '../shared/services/dijkstra.service';
import { MockioApiService } from '../shared/services/mockio-api.service';
import { AuthRequest } from '../auth/models/AuthRequest';
import { RoutePathService } from '../route-path/route-path.service';
import { ListRouteDto } from './dto/list-route.dto';

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
    const packageRoute = this.dijkstraService.dijkstra(
      graph,
      createRouteDto.origin,
      createRouteDto.packageCollection,
    );
    const finalRoute = this.dijkstraService.dijkstra(
      graph,
      createRouteDto.packageCollection,
      createRouteDto.destination,
    );

    const data: RouteEntity = {
      ...createRouteDto,
      dateCreated: new Date(),
      timeRoute: packageRoute?.time + finalRoute?.time,
      userId: req.user.id,
    };

    const createdRoute = await this.prisma.route.create({ data });
    const routePaths = packageRoute.path.map((path) => path);
    routePaths.push(...finalRoute.path.map((path) => path));
    if (routePaths && routePaths.length > 0) {
      await Promise.all(
        routePaths.map(async (path) => {
          await this.prisma.routePath.create({
            data: {
              coordinate: path,
              dateCreated: new Date(),
              route: {
                connect: {
                  id: createdRoute.id,
                },
              },
            },
          });
        }),
      );
    }
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
      routePaths,
    };
  }

  async findAll(req: AuthRequest): Promise<ListRouteDto[]> {
    const listRouteEntity = await this.prisma.route.findMany({
      include: {
        routePaths: true,
      },
      where: { userId: req.user.id },
    });
    return listRouteEntity?.map((route) => ({
      id: route.id,
      origin: route.origin,
      destination: route.destination,
      packageCollection: route.packageCollection,
      timeRoute: route.timeRoute,
      dateCreated: this.formatDate(route.dateCreated),
      routePaths: route.routePaths?.map((path) => path.coordinate),
    }));
  }

  formatDate(date: Date): string {
    const hour = `${date.getHours()}:${date.getMinutes()}`;
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${hour}`;
  }
}
