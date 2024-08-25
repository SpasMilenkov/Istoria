import { Controller, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() data: CreateUserDto) {
    return this.userService.register(data);
  }

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    return this.userService.login(data);
  }

  @Put('update/:id')
  async update(@Param('id') userId: string, @Body() data: UpdateUserDto) {
    return this.userService.update(userId, data);
  }

  @Delete('delete/:id')
  async delete(@Param('id') userId: string) {
    return this.userService.delete(userId);
  }
}
