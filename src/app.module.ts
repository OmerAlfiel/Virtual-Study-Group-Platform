import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { GroupsModule } from './group/group.module';
import { ResourcesModule } from './resource/resource.module';
import { ForumModule } from './forum/forum.module';
import { TaskModule } from './task/task.module';
import { NotificationModule } from './notification/notification.module';
import { StudySessionGateway } from './study-session/study-session.gateway';


import { User } from './entities/user.entity';
import { Group } from './entities/group.entity';
import { Resource } from './entities/resource.entity';
import { Task } from './entities/task.entity';
import { Session } from './entities/session.entity';
import { ForumPost } from './entities/forum-post.entity';
import { Comment } from './entities/comment.entity';
import { Vote } from './entities/vote.entity';
import { Notification } from './entities/notification.entity';
import { NotificationSettings } from './entities/notification-settings.entity';
import { NotificationGateway } from './notification/notification.gateway';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Group, Resource, Task, Session, ForumPost, Comment, Vote, Notification, NotificationSettings],
    }),
    AuthModule,
    UsersModule,
    GroupsModule,
    ResourcesModule,
    ForumModule,
    TaskModule,
    NotificationModule,
    AnalyticsModule,
  ],
  providers: [StudySessionGateway, NotificationGateway],
})
export class AppModule {}