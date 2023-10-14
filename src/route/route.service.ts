import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { RouteEntity } from './entities/route.entity';
import { PrismaService } from '../database/prisma.service';
import { DijkstraService } from '../shared/services/dijkstra.service';
import { MockioApiService } from '../shared/services/mockio-api.service';
import { AuthRequest } from '../auth/models/AuthRequest';
import { RoutePathService } from '../route-path/route-path.service';
import { CreateRoutePathDto } from '../route-path/dto/create-route-path.dto';

@Injectable()
export class RouteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dijkstraService: DijkstraService,
    private readonly routePathService: RoutePathService,
    private readonly mockioApi: MockioApiService,
  ) {}

  async create(req: AuthRequest, createRouteDto: CreateRouteDto): Promise<any> {
    const graph = await this.mockioApi.fetchData();
    const packageRoute = this.dijkstraService.dijkstra(
      graph,
      createRouteDto.origin,
      createRouteDto.package_collection,
    );
    const finalRoute = this.dijkstraService.dijkstra(
      graph,
      createRouteDto.package_collection,
      createRouteDto.destination,
    );

    const data: RouteEntity = {
      ...createRouteDto,
      DateCreated: new Date(),
      TimePercourse: packageRoute?.time + finalRoute?.time,
      userId: req.user.id,
    };

    const createdRoute = await this.prisma.route.create({ data });
    const routePaths = packageRoute.path.map((path) => path);
    routePaths.push(...finalRoute.path.map((path) => path));
    console.log(routePaths);
    console.log(createdRoute);
    if (routePaths && routePaths.length > 0) {
      await Promise.all(
        routePaths.map(async (path) => {
          await this.prisma.routePath.create({
            data: {
              Coordinate: path,
              DateCreated: new Date(),
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
    return {
      ...createdRoute,
      routePaths,
    };
  }
}
