import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsPositive, IsString, Max } from 'class-validator';

export class CreateUniversityDto {
    @ApiProperty()
    @IsString()
    'state-province': string;

    @ApiProperty()
    @IsArray()
    domains: string[];

    @ApiProperty()
    @IsString()
    country: string;

    @ApiProperty()
    @IsArray()
    web_pages: string[];

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    alpha_two_code: string;
}
