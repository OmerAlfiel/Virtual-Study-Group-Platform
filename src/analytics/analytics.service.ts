import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../entities/group.entity';
import { User } from '../entities/user.entity';
import { GroupActivityDto } from '../dto/group-activity.dto';
import { UserActivityDto } from '../dto/user-activity.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getGroupActivity(groupId: number): Promise<GroupActivityDto> {
    const group = await this.groupRepository.findOne({ where: { id: groupId }, relations: ['users', 'tasks', 'sessions'] });
    const totalStudySessions = group.sessions.length;
    const totalTasksCompleted = group.tasks.filter(task => task.isCompleted).length;
    const activeUsers = group.users.length;

    return { groupId, totalStudySessions, totalTasksCompleted, activeUsers };
  }

  async getUserActivity(userId: number): Promise<UserActivityDto> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['groups', 'tasks', 'sessions'] });
    const totalStudyTime = user.sessions.reduce((sum, session) => sum + session.duration, 0);
    const tasksCompleted = user.tasks.filter(task => task.isCompleted).length;
    const groupsJoined = user.groups.length;

    return { userId, totalStudyTime, tasksCompleted, groupsJoined };
  }
}