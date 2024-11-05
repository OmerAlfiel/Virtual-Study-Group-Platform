
import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { GroupActivityDto } from '../dto/group-activity.dto';
import { UserActivityDto } from '../dto/user-activity.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('group/:id')
  async getGroupActivity(@Param('id') groupId: number): Promise<GroupActivityDto> {
    return this.analyticsService.getGroupActivity(groupId);
  }

  @Get('user/:id')
  async getUserActivity(@Param('id') userId: number): Promise<UserActivityDto> {
    return this.analyticsService.getUserActivity(userId);
  }
}