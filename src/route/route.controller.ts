import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Request,
  HttpCode,
  Get, UnauthorizedException
} from "@nestjs/common";
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { validate } from 'class-validator';
import { AuthRequest } from '../auth/models/AuthRequest';
import { ListRouteDto } from './dto/list-route.dto';
import { ResponseResult } from '../shared/classes/ResponseResult';
import { HttpStatusCode } from 'axios';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller('route')
@ApiTags('Route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new Route',
    operationId: 'create',
    description: '' +
      'origin\n' +
      'packageCollection\n' +
      'destination',
  })
  async create(
    @Request() req: AuthRequest,
    @Body() createRouteDto: CreateRouteDto,
  ): Promise<IHttpResult<ListRouteDto>> {
    if (!req?.user?.id) {
      throw new UnauthorizedException('userNotAuthenticated');
    }
    const routeDto = await this.routeService.create(req, createRouteDto);
    return new ResponseResult<ListRouteDto>(
      HttpStatusCode.Created,
      true,
      routeDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'FindAll Routes',
    operationId: 'findMany',
    description: '',
  })
  async findAll(@Request() req: AuthRequest): Promise<IHttpResult<ListRouteDto[]>> {
    const listRouteDto = await this.routeService.findAll(req);
    return new ResponseResult<ListRouteDto[]>(
      HttpStatusCode.Ok,
      true,
      listRouteDto,
    );
  }

}
