import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repositories/implementations/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}
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
}
