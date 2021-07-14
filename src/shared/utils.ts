import { UserEntity } from '@app/user/user.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common'
import { compare } from 'bcrypt'
import { NotFoundError } from 'rxjs';
export const comparePassword = async (userPassword: string, currentPassword: string) => {
    return await compare(currentPassword, userPassword);
};

export const checkUserWithMessage = (messageAuthId: number, userId: number): void => {
    if (messageAuthId !== userId) {
        throw new ForbiddenException('Can not delete message!');
    }
};

export const tryNotFoundUser = (user: UserEntity | undefined): void => {
    if(!user) {
        throw new NotFoundException('User not found')
    }
};

export const tryNotFoundUsers = (users: (UserEntity | undefined)[]): void => {
    if(!users) {
        throw new NotFoundException('User not found')
    }
    else if(users) {
        for (const user of users) {
            tryNotFoundUser(user);
        }
    }
}