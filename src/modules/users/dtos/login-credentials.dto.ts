import { IsNotEmpty, IsString } from "class-validator";

export class LoginCredentialsDto {
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}