import { IEntity } from '../../shared/interfaces/IEntity';

export class RouteEntity extends IEntity {
  origin: string;
  packageCollection: string;
  destination: string;
  timeRoute: number;
  userId: number;
}
