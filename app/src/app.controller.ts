import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('openComPort')
  openComPort(): string {
    this.appService.receiveUBlox();
    return this.appService.getHello();
  }

  @Get('writeComPort')
  writeComPort(): string {
    this.appService.writeToUBlox();
    return this.appService.getHello();
  }
}
