import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwt_secret } from './strategies/secret';
import { AuthController } from './auth.controller';
import { UserService } from '@app/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/user/user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret:jwt_secret.secret_key,
      signOptions: {
        expiresIn: jwt_secret.jwt_expiresIn
      },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService,AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
