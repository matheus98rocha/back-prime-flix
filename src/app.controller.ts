import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  inintApplication() {
    return 'Hello World';
  }
}
