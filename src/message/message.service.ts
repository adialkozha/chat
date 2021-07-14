import { UserEntity } from '@app/user/user.entity';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { DeleteResult, Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from './message.entity';
import { checkUserWithMessage } from '@app/shared/utils'
@Injectable()
export class MessageService {
    constructor(@InjectRepository(MessageEntity) private readonly messageRepository: Repository<MessageEntity>) { }

    async saveMessage(createMessage: CreateMessageDto, currentUser: UserEntity) {
        const newMessage = new MessageEntity();
        Object.assign(newMessage, createMessage);
        newMessage.author = currentUser;
        return this.messageRepository.save(newMessage);
    }

    async deleteMessage(messageId: number, currentUserId: number): Promise<DeleteResult> {
        const message = await this.messageRepository.findOne({ id: messageId });
        if (!message) {
            throw new NotFoundException('Message not found');
        }
        checkUserWithMessage(message.author.id, currentUserId);
        return await this.messageRepository.delete({id: messageId});
    }

    async getAllMessages():Promise<MessageEntity[]> {
        return this.messageRepository.find({
            relations: ['author']
        });
    }
}  