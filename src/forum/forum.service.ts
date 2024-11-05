import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForumPost } from '../entities/forum-post.entity';
import { Comment } from '../entities/comment.entity';
import { Vote } from '../entities/vote.entity';
import { CreateForumPostDto } from '../dto/create-forum-post.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CreateVoteDto } from '../dto/create-vote.dto';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(ForumPost)
    private readonly forumPostRepository: Repository<ForumPost>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
  ) {}

  async createForumPost(createForumPostDto: CreateForumPostDto): Promise<ForumPost> {
    const { title, content, userId } = createForumPostDto;
    const forumPost = new ForumPost();
    forumPost.title = title;
    forumPost.content = content;
    forumPost.user = { id: userId } as any; // Use a partial user object
    return this.forumPostRepository.save(forumPost);
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { content, userId, forumPostId } = createCommentDto;
    const comment = new Comment();
    comment.content = content;
    comment.user = { id: userId } as any; // Use a partial user object
    comment.forumPost = { id: forumPostId } as any; // Use a partial forum post object
    return this.commentRepository.save(comment);
  }

  async createVote(createVoteDto: CreateVoteDto): Promise<Vote> {
    const { value, userId, forumPostId } = createVoteDto;
    const vote = new Vote();
    vote.value = value;
    vote.user = { id: userId } as any; // Use a partial user object
    vote.forumPost = { id: forumPostId } as any; // Use a partial forum post object
    return this.voteRepository.save(vote);
  }

  async getForumPosts(): Promise<ForumPost[]> {
    return this.forumPostRepository.find({ relations: ['user', 'comments', 'votes'] });
  }

  async getForumPost(id: number): Promise<ForumPost> {
    return this.forumPostRepository.findOne({ where: { id }, relations: ['user', 'comments', 'votes'] });
  }
}