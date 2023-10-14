import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  @ApiOperation({
    summary: 'Create new user',
    operationId: 'create',
    description:
      '{ "name": "string", "email": "string", "password": "string" }',
  })
  @ApiResponse({ status: 201, description: 'Created.' })
  @ApiResponse({ status: 409, description: 'Username already exists.' })
  async create(@Body() createUserDto: CreateUserDto) {
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      throw new BadRequestException({ message: 'Validation failed', errors });
    }
    return await this.userService.create(createUserDto);
  }
}
