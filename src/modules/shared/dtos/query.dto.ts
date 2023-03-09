import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Max,
} from 'class-validator';

export class QueryDto {
  @ApiProperty({
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number = 1;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({
    default: 20,
    required: false,
  })
  @Max(1000)
  limit?: number = 20;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  country?: string;
}
