import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';

@WebSocketGateway()
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly notificationService: NotificationService) {}

  @SubscribeMessage('sendNotification')
  async handleSendNotification(@MessageBody() data: { userId: number; type: string; message: string }) {
    const notification = await this.notificationService.createNotification(data.userId, data.type, data.message);
    this.server.to(`user_${data.userId}`).emit('notification', notification);
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;
    client.join(`user_${userId}`);
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId;
    client.leave(`user_${userId}`);
  }
}