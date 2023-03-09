import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IUserTokenDto } from 'src/modules/auth/dtos/user-token.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginCredentialsDto } from '../dtos/login-credentials.dto';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    public async createUser(@Body() data: CreateUserDto) {
        return await this.userService.createUser(data);
    }

    @Post('login')
    public async login(@Body() data: LoginCredentialsDto) {
        return await this.userService.login(data);
    }

    @UseGuards(JwtAuthGuard)
    @Put('change-password')
    public async changePassword(@Body() data: ChangePasswordDto, @Req() request) {
        const user: IUserTokenDto = request.user;
        return await this.userService.changePassword(data, user);
    }
}
