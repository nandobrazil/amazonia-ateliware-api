import { ListRouteDto } from '../dto/list-route.dto';
import { RoutePathEntity } from '../../route-path/entities/route-path.entity';

export const listRouteMock: ListRouteDto[] = [
  {
    id: 1,
    origin: 'A8',
    destination: 'C3',
    packageCollection: 'C5',
    timeRoute: 161.3,
    dateCreated: '15/10/2023 23:55',
    routePaths: {
      origin: ['A8', 'B8', 'B7', 'B6', 'C6', 'C5'],
      destination: ['C5', 'C4', 'C3'],
    },
  },
];

export const routePathEntityMock: RoutePathEntity[] = [
  {
    id: 1,
    coordinate: 'A8',
    dateCreated: new Date('2023-10-16T02:55:18.158Z'),
    origin: true,
    order: 1,
    routeId: 1,
  },
  {
    id: 5,
    coordinate: 'C5',
    dateCreated: new Date('2023-10-16T02:55:18.158Z'),
    origin: false,
    order: 1,
    routeId: 1,
  },
  {
    id: 2,
    coordinate: 'B8',
    dateCreated: new Date('2023-10-16T02:55:18.158Z'),
    origin: true,
    order: 2,
    routeId: 1,
  },
  {
    id: 9,
    coordinate: 'C4',
    dateCreated: new Date('2023-10-16T02:55:18.158Z'),
    origin: false,
    order: 2,
    routeId: 1,
  },
  {
    id: 7,
    coordinate: 'C3',
    dateCreated: new Date('2023-10-16T02:55:18.158Z'),
    origin: false,
    order: 3,
    routeId: 1,
  },
  {
    id: 4,
    coordinate: 'B7',
    dateCreated: new Date('2023-10-16T02:55:18.158Z'),
    origin: true,
    order: 3,
    routeId: 1,
  },
  {
    id: 3,
    coordinate: 'B6',
    dateCreated: new Date('2023-10-16T02:55:18.158Z'),
    origin: true,
    order: 4,
    routeId: 1,
  },
  {
    id: 8,
    coordinate: 'C6',
    dateCreated: new Date('2023-10-16T02:55:18.158Z'),
    origin: true,
    order: 5,
    routeId: 1,
  },
  {
    id: 6,
    coordinate: 'C5',
    dateCreated: new Date('2023-10-16T02:55:18.158Z'),
    origin: true,
    order: 6,
    routeId: 1,
  },
];

export const listRouteEntityMock = [
  {
    id: 1,
    origin: 'A8',
    destination: 'C3',
    packageCollection: 'C5',
    dateCreated: new Date('2023-10-16T02:55:17.387Z'),
    timeRoute: 161.3,
    userId: 1,
    routePaths: routePathEntityMock,
  },
];

