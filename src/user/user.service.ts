import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import {PrismaService} from "../database/prisma.service";
import { Prisma } from "@prisma/client/extension";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    if (await this.findByUsername(createUserDto.username)) {
        throw new HttpException('messages.error.usernameAlreadyExists', HttpStatus.CONFLICT);
    }

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
