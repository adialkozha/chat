import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { UserService } from '@app/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RegistrationStatus } from './interfaces/registrattion-status.interface';
@Injectable()
export class AuthService {
    constructor(
        private readonly usresService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async register(createUserDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            succes:true,
            message: 'User registered'
        }

        try {
            await this.usresService.create(createUserDto)
        } catch (err) {
            status = {
                succes: false,
                message: err
            }
        }
        return status
    }
}
