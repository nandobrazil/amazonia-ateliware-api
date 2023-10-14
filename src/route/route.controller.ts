import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { validate } from 'class-validator';
import { AuthRequest } from '../auth/models/AuthRequest';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post()
  async create(
    @Request() req: AuthRequest,
    @Body() createRouteDto: CreateRouteDto,
  ) {
    const errors = await validate(createRouteDto);
    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'messages.error.invalidFormat',
        errors,
      });
    }
    return await this.routeService.create(req, createRouteDto);
  }

  // @Get()
  // findAll() {
  //   return this.routeService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.routeService.findOne(+id);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.routeService.remove(+id);
  // }
}
