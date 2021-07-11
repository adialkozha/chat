import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;
    @IsString()
    @IsNotEmpty()
    readonly password: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}