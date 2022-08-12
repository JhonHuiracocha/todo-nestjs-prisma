import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Status } from '@prisma/client';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}
