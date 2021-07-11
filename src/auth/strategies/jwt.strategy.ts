import { UserEntity } from '@app/user/user.entity'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwt_secret } from './secret'
import { AuthService } from '../auth.service'
import {JwtPayload} from '../interfaces/payload.interface'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwt_secret
        });
    }

    async validate(payload: JwtPayload): Promise<UserEntity> {
        const user = await this.authService.validateUser(payload);
        if(!user) {
            throw new HttpException('Invlaid token',HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}