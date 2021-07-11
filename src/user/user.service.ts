import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './user.entity';
import { comparePassword } from '@app/shared/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtPayload } from '../auth/interfaces/payload.interface'
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }
    async list(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async findOne(options?: object): Promise<UserEntity> {
        const user = await this.userRepository.findOne(options)
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async findByLogin(loginDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({username: loginDto.username});
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const areEqual = await comparePassword(user.password, loginDto.password)
        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
        }
        return user;
    }

    async findByPayload({username}: any): Promise<UserEntity> {
        return this.findOne({where: {username}});
    }

    async create (createUserDto:CreateUserDto): Promise<UserEntity>{
        const user = await this.userRepository.findOne({username: createUserDto.username});
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }


        const newUser: UserEntity = new UserEntity();
        Object.assign(newUser,createUserDto);
        return this.userRepository.save(newUser);
    }
}

