import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { LoginUserDto } from '@app/user/dto/login-user.dto';
import { UserService } from '@app/user/user.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegistrationStatus } from './interfaces/registrattion-status.interface';
import { LoginStatus } from './interfaces/login-status.interface'
import { UserEntity } from '@app/user/user.entity';
import { JwtPayload } from './interfaces/payload.interface';
import { jwt_secret } from './strategies/secret';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async register(createUserDto: CreateUserDto): Promise<RegistrationStatus> {
        console.log(createUserDto)
        let status: RegistrationStatus = {
            succes: true,
            message: 'User registered'
        };

        try {
            await this.usersService.create(createUserDto);
        } catch (err) {
            status = {
                succes: false,
                message: err
            };
        }
        return status;
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
        const user: UserEntity = await this.usersService.findByLogin(loginUserDto);
        const token = this._createToken(user);
        return {
            username: user.username,
            ...token
        };
    }

    async validateUser(payload: JwtPayload): Promise<UserEntity> {
        const user = await this.usersService.findByPayload(payload);
        if (!user) {
            throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    private _createToken({ username }: UserEntity) {
        const expiresIn = jwt_secret.jwt_expiresIn;
        const user: JwtPayload = { username };
        const accessToken = this.jwtService.sign(user);
        return { expiresIn, accessToken };
    }
}
