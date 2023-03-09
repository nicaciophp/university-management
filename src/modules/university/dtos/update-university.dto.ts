import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class UpdateUniversityDto {
    @IsArray()
    @IsNotEmpty()
    domains: string[];
    @IsArray()
    @IsNotEmpty()
    web_pages: string[];
    @IsString()
    @IsNotEmpty()
    name: string;
}