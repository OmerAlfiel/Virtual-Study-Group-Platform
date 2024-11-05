import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationSettings } from '../entities/notification-settings.entity';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  createNotification(@Body() createNotificationDto: { userId: number; type: string; message: string }) {
    return this.notificationService.createNotification(createNotificationDto.userId, createNotificationDto.type, createNotificationDto.message);
  }

  @Get(':userId')
  getNotifications(@Param('userId') userId: number) {
    return this.notificationService.getNotifications(userId);
  }

  @Patch(':notificationId/read')
  markAsRead(@Param('notificationId') notificationId: number) {
    return this.notificationService.markAsRead(notificationId);
  }

  @Patch('settings/:userId')
  updateNotificationSettings(@Param('userId') userId: number, @Body() settings: Partial<NotificationSettings>) {
    return this.notificationService.updateNotificationSettings(userId, settings);
  }

  @Get('settings/:userId')
  getNotificationSettings(@Param('userId') userId: number) {
    return this.notificationService.getNotificationSettings(userId);
  }
}