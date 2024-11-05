import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// use socket.io request to test the gateway
@WebSocketGateway()
export class StudySessionGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('offer')
  handleOffer(client: Socket, payload: any): void {
    console.log('Received offer:', payload);
    client.broadcast.emit('offer', payload);
  }

  @SubscribeMessage('answer')
  handleAnswer(client: Socket, payload: any): void {
    console.log('Received answer:', payload);
    client.broadcast.emit('answer', payload);
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(client: Socket, payload: any): void {
    console.log('Received ICE candidate:', payload);
    client.broadcast.emit('ice-candidate', payload);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    console.log('Received message:', payload);
    return 'Hello world!';
  }
}