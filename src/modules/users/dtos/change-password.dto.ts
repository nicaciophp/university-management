import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ChangePasswordDto {
    @ApiProperty()
    @IsString()
    password: string;
    @ApiProperty()
    @IsString()
    confirm_password: string;
}