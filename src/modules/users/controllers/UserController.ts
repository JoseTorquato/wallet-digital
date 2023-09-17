import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { DataSignUp } from '../interfaces/DataSignUp';
import { UserService } from '../services/UserService';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async create(@Body() body: DataSignUp) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltOrRounds);
    const result = await this.userService.createUser(
      body.username,
      hashedPassword,
    );
    return result;
  }

  @Get('/response')
  response(@Req() req) {
    return req.user;
  }
}
