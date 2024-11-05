import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../entities/group.entity';
import { User } from '../entities/user.entity';
import { CreateGroupDto } from 'src/dto/create-group.dto';
import { UpdateGroupDto } from 'src/dto/update-group.dto';


@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.groupRepository.create(createGroupDto);
    return this.groupRepository.save(group);
  }

  async findAll(): Promise<Group[]> {
    return this.groupRepository.find({ relations: ['users'] });
  }

  async findOne(id: number): Promise<Group> {
    return this.groupRepository.findOne({ where: { id }, relations: ['users'] });
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    await this.groupRepository.update(id, updateGroupDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.groupRepository.delete(id);
  }

  async addUserToGroup(groupId: number, userId: number): Promise<Group> {
    const group = await this.findOne(groupId);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    group.users.push(user);
    return this.groupRepository.save(group);
  }

  async removeUserFromGroup(groupId: number, userId: number): Promise<Group> {
    const group = await this.findOne(groupId);
    group.users = group.users.filter(user => user.id !== userId);
    return this.groupRepository.save(group);
  }
}