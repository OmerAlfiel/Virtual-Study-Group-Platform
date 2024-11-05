import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ResourcesService } from './resource.service';
import { CreateResourceDto } from 'src/dto/create-resource.dto';
import { UpdateResourceDto } from 'src/dto/update-resource.dto';


@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @Get()
  findAll() {
    return this.resourcesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateResourceDto: UpdateResourceDto) {
    return this.resourcesService.update(+id, updateResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourcesService.remove(+id);
  }

  @Get('group/:groupId')
  findByGroup(@Param('groupId') groupId: string) {
    return this.resourcesService.findByGroup(+groupId);
  }
}