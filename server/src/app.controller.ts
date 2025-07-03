// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UsersService) {}

  @Get('users/all')
  getAll() {
    return this.userService.findAll();
  }
}
