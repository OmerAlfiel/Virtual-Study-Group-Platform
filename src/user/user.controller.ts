import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';

import { CreateUserDto } from 'src/dto/create-user.dto';


import { User } from '../entities/user.entity';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    
  ) {}

  @Get(':username')
  async findOneByUsername(@Param('username') username: string): Promise<User | undefined> {
    return this.usersService.findOneByUsername(username);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

 
  
}