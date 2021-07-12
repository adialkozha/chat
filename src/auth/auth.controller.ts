import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { LoginUserDto } from '@app/user/dto/login-user.dto';
import {
    Body, Controller,
    Get, HttpException, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { RegistrationStatus } from './interfaces/registrattion-status.interface';
import { CurrentUser } from '@app/decorator/CurrentUser.decorator';
import { UserEntity } from '@app/user/user.entity';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtPayload } from './interfaces/payload.interface';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @UsePipes(new ValidationPipe())
    public async register(
        @Body() createUserDto: CreateUserDto
    ): Promise<RegistrationStatus> {
        const result: RegistrationStatus = await this.authService.register(createUserDto);
        if (!result.succes) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
        return await this.authService.login(loginUserDto);
    }

    @Get('whoami')
    @UseGuards(JwtAuthGuard)
    public async testAuth(@CurrentUser() user: UserEntity) {
        console.log(user)
        return user;
    }

    @Post('test')
    public async test(@Body() body:any) {
        const a = await this.authService.validateUser(body);
        console.log(a)
    }
}
