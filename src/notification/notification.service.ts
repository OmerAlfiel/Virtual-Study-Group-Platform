import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { NotificationSettings } from '../entities/notification-settings.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(NotificationSettings)
    private readonly notificationSettingsRepository: Repository<NotificationSettings>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createNotification(userId: number, type: string, message: string): Promise<Notification> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const notification = this.notificationRepository.create({ type, message, isRead: false, user });
    return this.notificationRepository.save(notification);
  }

  async getNotifications(userId: number): Promise<Notification[]> {
    return this.notificationRepository.find({ where: { user: { id: userId } }, order: { id: 'DESC' } });
  }

  async markAsRead(notificationId: number): Promise<void> {
    await this.notificationRepository.update(notificationId, { isRead: true });
  }

  async updateNotificationSettings(userId: number, settings: Partial<NotificationSettings>): Promise<NotificationSettings> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['notificationSettings'] });
    if (!user.notificationSettings) {
      user.notificationSettings = this.notificationSettingsRepository.create(settings);
      user.notificationSettings.user = user;
      await this.notificationSettingsRepository.save(user.notificationSettings);
    } else {
      await this.notificationSettingsRepository.update(user.notificationSettings.id, settings);
    }
    return user.notificationSettings;
  }

  async getNotificationSettings(userId: number): Promise<NotificationSettings> {
    return this.notificationSettingsRepository.findOne({ where: { user: { id: userId } } });
  }
}