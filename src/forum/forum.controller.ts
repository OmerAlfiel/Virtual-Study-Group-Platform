import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumPostDto } from 'src/dto/create-forum-post.dto';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
import { CreateVoteDto } from 'src/dto/create-vote.dto';


@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post('posts')
  createForumPost(@Body() createForumPostDto: CreateForumPostDto) {
    return this.forumService.createForumPost(createForumPostDto);
  }

  @Post('comments')
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.forumService.createComment(createCommentDto);
  }

  @Post('votes')
  createVote(@Body() createVoteDto: CreateVoteDto) {
    return this.forumService.createVote(createVoteDto);
  }

  @Get('posts')
  getForumPosts() {
    return this.forumService.getForumPosts();
  }

  @Get('posts/:id')
  getForumPost(@Param('id') id: number) {
    return this.forumService.getForumPost(id);
  }
}