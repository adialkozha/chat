import { Controller, Get } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService:UserService) {}
    @Get('user')
    async list ():Promise<UserEntity[]> {
        return await this.userService.list()
    }
}