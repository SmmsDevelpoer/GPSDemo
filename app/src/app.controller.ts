import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.debug(process.env.NODE_ENV === 'development'
      ? ['log', 'debug', 'error', 'verbose', 'warn']
      : ['error', 'warn']);
    return this.appService.getHello()
  }

  @Get('scanComPort')
  scanComPort(): string {
    this.appService.turnOnUBlox();
    return this.appService.getHello();
  }
}
