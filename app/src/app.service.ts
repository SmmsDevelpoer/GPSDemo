import { Injectable } from '@nestjs/common';
import { LogRecordService } from './logger/logger.service';
import * as SerialPort from 'serialport';

@Injectable()
export class AppService {
  private uBlox: SerialPort;

  constructor(private readonly logger: LogRecordService) {}

  getHello(): string {
    return 'Hello World!';
  }

  public async receiveUBlox() {
    const path = process.env.COMDEVPATH;
    this.uBlox = new SerialPort(
      path,
      { baudRate: 38400, dataBits: 8, stopBits: 1, parity: 'none' },
      (error: Error) => {
        if (error) {
          console.debug('error', error);
          this.logger.error(
            JSON.stringify(error),
            `Com port open failed, device path "${path}"`,
          );
        }
      },
    );

    this.uBlox.on('open', (error) => {
      console.log('serial port open success.');
      if (error) {
        console.log('serial port open fail.');
      }
    });

    const readLine = SerialPort.parsers.Readline;
    const parser = new readLine({ delimiter: '\r\n' });
    this.uBlox.pipe(parser);
    parser.on('data', (data) => {
      this.logger.log(data);
      this.processNMEA(data);
    });
  }

  public writeToUBlox() {
    const data = [0xb5, 0x62, 0x0a, 0x04, 0x00, 0x00, 0x0e, 0x34];
    this.uBlox.write(data, (error) => {
      if (error) {
        this.logger.error('Error on write data to com port', '');
      }
    });
  }

  public async getSerialPortList() {
    const comPorts = await SerialPort.list();
    comPorts.forEach((comPort) => {
      this.logger.log('Com port device info: ' + JSON.stringify(comPort));
    });
  }

  private processNMEA(nmea: string) {
    const command = nmea.split(',');
    const header = command[0];

    switch (header) {
      case '$GPRMC':
      case '$GNRMC':
        this.logger.log(
          'GPS Info: ' + JSON.stringify(this.possionInfo(command)),
        );
        break;
      default:
        break;
    }
  }

  private possionInfo(rmc: string[]) {
    if (rmc[2] === 'V') {
      return {
        vaild: false,
        latitude: 0,
        latDir: '',
        longitude: 0,
        lonDir: '',
      };
    }

    const utc = rmc[1];
    const lat = this.latDegreeTran(rmc[3]);
    const latDir = rmc[4];
    const lon = this.lonDegreeTran(rmc[5]);
    const lonDir = rmc[6];
    const speed = rmc[7]; // knots
    const date = rmc[9];
    return {
      vaild: true,
      latitude: lat,
      latDir: latDir,
      longitude: lon,
      lonDir: lonDir,
    };
  }

  private latDegreeTran(degreeM: string) {
    return (
      Number(degreeM.slice(0, 2)) +
      Number(degreeM.slice(2, degreeM.length)) / 60
    );
  }

  private lonDegreeTran(degreeM: string) {
    return (
      Number(degreeM.slice(0, 3)) +
      Number(degreeM.slice(3, degreeM.length)) / 60
    );
  }
}
