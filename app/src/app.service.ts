import { Injectable } from '@nestjs/common';
import * as SerialPort from 'serialport';
import { LogRecordService } from './logger/logger.service';

@Injectable()
export class AppService {
  // private comDevs: SerialPort[];

  constructor(
    private readonly logger: LogRecordService
  ) {

  }

  getHello(): string {
    return 'Hello World!';
  }

  public async turnOnUBlox() {
    await this.getUBloxComDevPath();
    // this.comDevs = new SerialPort(path, { baudRate: 38400 }, (error: Error) => {
    //   if (error) {
    //     console.debug('error', error);
    //   }
    // });
    //
    // this.uBlox.on('open', (error) => {
    //   console.log('serial port open success.');
    //   if (error) {
    //     console.log('serial port open fail.');
    //   }
    // });
    //
    // const readLine = SerialPort.parsers.Readline;
    // const parser = new readLine({ delimiter: '\r\n' });
    // this.uBlox.pipe(parser);
    // parser.on('data', (data) => {
    //   // console.debug(`${Date.now()}: ${data}`);
    //   this.processNMEA(data);
    // });
  }

  private async getUBloxComDevPath() {
    console.debug('11111111111111111');
    let comPorts = await SerialPort.list();
    console.debug('22222222222222222');
    comPorts.forEach((comPort) => {
      this.logger.log('Com port device info: ' + JSON.stringify(comPort));
    });

    // const uBloxDevices = comPorts.filter((comPort: PortInfo) => {
    //   // return comPort.manufacturer === 'u-blox AG - www.u-blox.com';
    //   return comPort.manufacturer === 'Silicon Labs';
    // });
    //
    // if (uBloxDevices.length === 0) {
    //   console.log('no ublox gps exist');
    // } else {
    //   this.appService.turnOnUBlox(uBloxDevices[0].path);
    //
    //   // uBlox.close((error: Error) => {
    //   //   console.log('port closed', error);
    //   // });
    // }
  }
}
