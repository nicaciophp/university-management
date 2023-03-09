import { IsArray, IsInt, IsPositive, IsString, Max } from 'class-validator';

export class CreateUniversityDto {
    @IsString()
    'state-province': string;

    @IsArray()
    domains: string[];

    @IsString()
    country: string;

    @IsArray()
    web_pages: string[];

    @IsString()
    name: string;

    @IsString()
    alpha_two_code: string;
}
