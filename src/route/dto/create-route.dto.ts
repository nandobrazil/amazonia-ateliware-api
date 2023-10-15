import { Matches } from 'class-validator';
import { Prisma } from "@prisma/client";

export class CreateRouteDto {
  @Matches(/^[A-H][1-8]$/, {
    message: 'messages.error.invalidFormat',
  })
  origin: string;

  @Matches(/^[A-H][1-8]$/, {
    message: 'messages.error.invalidFormat',
  })
  packageCollection: string;

  @Matches(/^[A-H][1-8]$/, {
    message: 'messages.error.invalidFormat',
  })
  destination: string;

  routePaths?: string[];
}
