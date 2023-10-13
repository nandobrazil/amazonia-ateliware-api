    import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(4, {
    message: 'messages.error.min4char'
  })
  @MaxLength(20, {
    message: 'messages.error.max20char'
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'messages.error.passwordToWeek',
  })
  password: string;

  @IsString()
  name: string;
}
