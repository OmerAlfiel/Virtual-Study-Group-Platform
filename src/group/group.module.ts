import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Group } from '../entities/group.entity';
import { User } from '../entities/user.entity';
import { GroupsService } from './group.service';
import { GroupsController } from './group.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User])],
  providers: [GroupsService],
  controllers: [GroupsController],
})
export class GroupsModule {}