import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { ForumPost } from '../entities/forum-post.entity';
import { Comment } from '../entities/comment.entity';
import { Vote } from '../entities/vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ForumPost, Comment, Vote])],
  providers: [ForumService],
  controllers: [ForumController],
})
export class ForumModule {}