import { Injectable } from '@nestjs/common';
import { CreateCalculateRouteDto } from './dto/create-calculate-route.dto';

@Injectable()
export class CalculateRouteService {
  create(createCalculateRouteDto: CreateCalculateRouteDto) {
    return 'This action adds a new calculateRoute';
  }

  findAll() {
    return `This action returns all calculateRoute`;
  }

  findOne(id: number) {
    return `This action returns a #${id} calculateRoute`;
  }

  remove(id: number) {
    return `This action removes a #${id} calculateRoute`;
  }
}
