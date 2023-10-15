import { ListRoutePathDto } from '../../route-path/dto/list-route-path.dto';

export class ListRouteDto {
  id: number;
  origin: string;
  destination: string;
  packageCollection: string;
  dateCreated: string;
  timeRoute: number;
  routePaths: ListRoutePathDto;
}
