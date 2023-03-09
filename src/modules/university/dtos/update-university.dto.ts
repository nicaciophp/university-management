import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class UpdateUniversityDto {
    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    domains: string[];
    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    web_pages: string[];
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
}