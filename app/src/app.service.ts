import { Injectable } from '@nestjs/common';
import { LogRecordService } from './logger/logger.service';
import * as SerialPort from 'serialport';
import { PortInfo } from 'serialport';

@Injectable()
export class AppService {
  private uBlox: SerialPort;

  constructor(private readonly logger: LogRecordService) {}

  getHello(): string {
    return 'Hello World!';
  }

  public async turnOnUBlox() {
    await this.getUBloxComDevPath();
    const path = '/dev/ttyS1';
    this.uBlox = new SerialPort(path, { baudRate: 38400 }, (error: Error) => {
      if (error) {
        this.logger.error(
          JSON.stringify(error),
          `Com port open failed, device path "${path}"`,
        );
      }
    });
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
    const comPorts = await SerialPort.list();
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
