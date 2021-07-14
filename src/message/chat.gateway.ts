import { JwtAuthGuard } from '@app/auth/guards/jwt.guard';
import { CurrentUser } from '@app/decorator/CurrentUser.decorator';
import { UserEntity } from '@app/user/user.entity';
import { UseGuards } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer()
    server: Server;
    constructor(private readonly messageService: MessageService) {
    }
    @UseGuards(JwtAuthGuard)
    async handleConnection(socket: Socket,@CurrentUser() user: UserEntity) {
        process.nextTick(() => {
            socket.emit('allMessages', this.messageService.getAllMessages)
        });
    }

    @SubscribeMessage('send_message')
    listenForMessages(@MessageBody() data: string, @ConnectedSocket() socket: Socket) {

        this.server.sockets.emit('receive_message', data);
    }
}