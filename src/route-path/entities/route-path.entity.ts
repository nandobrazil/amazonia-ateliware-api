import { IEntity } from '../../shared/interfaces/IEntity';

export class RoutePathEntity extends IEntity {
  coordinate: string;
  origin: boolean;
  order: number;
  dateCreated: Date;
}
