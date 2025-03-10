import { Controller, Put, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
  ) { }
  
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto,
  ) {
    return this.userService.updateUser({
      where: { id },
      data: updateUserDto
    });
  }
}
