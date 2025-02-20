import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('/user')
  getUser(): { name: string } {
    return {
      name: 'John',
    };
  }

  @Post('/user')
  createUser(@Body() user: { name: string }): { name: string } {
    return {
      name: user.name,
    };
  }

  @Delete('/user:id')
  deleteUser(@Param('id') id: string): { name: string } {
    return {
      name: 'John ' + id,
    };
  }
}
