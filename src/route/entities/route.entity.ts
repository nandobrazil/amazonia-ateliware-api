import { RoutePathEntity } from '../../route-path/entities/route-path.entity';
import { UserEntity } from '../../user/entities/user.entity';

export class RouteEntity {
  id?: number;
  origin: string;
  package_collection: string;
  destination: string;
  DateCreated: Date;
  TimePercourse: number;
  userId: number;
}
