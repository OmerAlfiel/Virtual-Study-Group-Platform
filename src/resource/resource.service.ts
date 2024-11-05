import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from '../entities/resource.entity';
import { Group } from '../entities/group.entity';
import { CreateResourceDto } from 'src/dto/create-resource.dto';
import { UpdateResourceDto } from 'src/dto/update-resource.dto';


@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(createResourceDto: CreateResourceDto): Promise<Resource> {
    const group = await this.groupRepository.findOne({ where: { id: createResourceDto.groupId } });
    const resource = this.resourceRepository.create({
      ...createResourceDto,
      group,
    });
    return this.resourceRepository.save(resource);
  }

  async findAll(): Promise<Resource[]> {
    return this.resourceRepository.find({ relations: ['group'] });
  }

  async findOne(id: number): Promise<Resource> {
    return this.resourceRepository.findOne({ where: { id }, relations: ['group'] });
  }

  async update(id: number, updateResourceDto: UpdateResourceDto): Promise<Resource> {
    await this.resourceRepository.update(id, updateResourceDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.resourceRepository.delete(id);
  }

  async findByGroup(groupId: number): Promise<Resource[]> {
    return this.resourceRepository.find({ where: { group: { id: groupId } }, relations: ['group'] });
  }
}