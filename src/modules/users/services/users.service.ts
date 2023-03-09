import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repositories/implementations/user.repository';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from '../dtos/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { IUserTokenDto } from 'src/modules/auth/dtos/user-token.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository, 
        private readonly jwtService: JwtService
        ) {}
    public async createUser(data: CreateUserDto) {
        if(data.password != data.confirm_password) {
            throw new BadRequestException('As senhas precisam ser iguais.');
        }
        const user = await this.userRepository.findByEmail(data.email);
        if(!!user) {
            throw new BadRequestException('Email já existe, escolha outro e tente novamente.');
        }
        delete data.confirm_password;
        data.password = await bcrypt.hash(data.password, 10);
        try {
            await this.userRepository.create(data);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    public async login(data: LoginCredentialsDto) {
        const user = await this.userRepository.findByEmail(data.email);

        if(!user) {
            throw new BadRequestException('Usuário ou senhas incorretos.');
        }

        const isMatchPassword = await bcrypt.compare(data.password, user.password);
        if(!isMatchPassword) {
            throw new BadRequestException('Usuário ou senhas incorretos.');
        }

        const payload = { id: user._id, email: user.email };

        return {
            access_token: this.jwtService.sign(payload),
          }
    }

    public async changePassword(data: ChangePasswordDto, user: IUserTokenDto) {
        if(data.password != data.confirm_password) {
            throw new BadRequestException('As senhas precisam ser iguais.');
        }
        const passwordEncrypted = await bcrypt.hash(data.password, 10);
        try {
            await this.userRepository.changePassword(passwordEncrypted, user.userId);
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
