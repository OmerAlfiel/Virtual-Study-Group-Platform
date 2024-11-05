import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Resource } from '../entities/resource.entity';
import { Group } from '../entities/group.entity';
import { ResourcesService } from './resource.service';
import { ResourcesController } from './resource.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, Group])],
  providers: [ResourcesService],
  controllers: [ResourcesController],
})
export class ResourcesModule {}