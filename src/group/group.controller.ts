import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { GroupsService } from './group.service';
import { CreateGroupDto } from 'src/dto/create-group.dto';
import { UpdateGroupDto } from 'src/dto/update-group.dto';


@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }

  @Post(':id/users/:userId')
  addUserToGroup(@Param('id') id: string, @Param('userId') userId: string) {
    return this.groupsService.addUserToGroup(+id, +userId);
  }

  @Delete(':id/users/:userId')
  removeUserFromGroup(@Param('id') id: string, @Param('userId') userId: string) {
    return this.groupsService.removeUserFromGroup(+id, +userId);
  }
}