import { IsEmail, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class PayloadDto {
  @IsNumber()
  @IsPositive()
  sub: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
