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

  @Get('sendVersion')
  sendVersion(): string {
    this.appService.sendVersion();
    return this.appService.getHello();
  }

  @Get('coldReset')
  coldReset(): string {
    this.appService.coldReset();
    return this.appService.getHello();
  }

  @Get('warmReset')
  warmReset(): string {
    this.appService.warmReset();
    return this.appService.getHello();
  }

  @Get('hotReset')
  hotReset(): string {
    this.appService.hotReset();
    return this.appService.getHello();
  }
}
