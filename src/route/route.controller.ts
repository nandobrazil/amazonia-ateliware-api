import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Request,
  HttpCode,
  Get,
} from '@nestjs/common';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { validate } from 'class-validator';
import { AuthRequest } from '../auth/models/AuthRequest';
import { ListRouteDto } from './dto/list-route.dto';
import { ResponseResult } from '../shared/classes/ResponseResult';
import { HttpStatusCode } from 'axios';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post()
  async create(
    @Request() req: AuthRequest,
    @Body() createRouteDto: CreateRouteDto,
  ): Promise<IHttpResult<ListRouteDto>> {
    await validate(createRouteDto);
    const routeDto = await this.routeService.create(req, createRouteDto);
    return new ResponseResult<ListRouteDto>(
      HttpStatusCode.Created,
      true,
      routeDto,
    );
  }

  @Get()
  async findAll(@Request() req: AuthRequest): Promise<IHttpResult<ListRouteDto[]>> {
    const listRouteDto = await this.routeService.findAll(req);
    return new ResponseResult<ListRouteDto[]>(
      HttpStatusCode.Ok,
      true,
      listRouteDto,
    );
  }

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
