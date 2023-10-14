import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CalculateRouteService } from './calculate-route.service';
import { CreateCalculateRouteDto } from './dto/create-calculate-route.dto';

@Controller('calculate-route')
export class CalculateRouteController {
  constructor(private readonly calculateRouteService: CalculateRouteService) {}

  @Post()
  create(@Body() createCalculateRouteDto: CreateCalculateRouteDto) {
    return this.calculateRouteService.create(createCalculateRouteDto);
  }

  @Get()
  findAll() {
    return this.calculateRouteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calculateRouteService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calculateRouteService.remove(+id);
  }
}
