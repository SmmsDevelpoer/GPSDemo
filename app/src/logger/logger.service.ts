import { Injectable, Logger, Scope } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

@Injectable({ scope: Scope.TRANSIENT })
export class LogRecordService extends Logger {
  constructor() {
    super();

    const logFolderPath = join(process.cwd(), 'log');
    if (!fs.existsSync(logFolderPath)) {
      fs.mkdirSync(logFolderPath, { recursive: true });
    }
  }

  setContext(context: string) {
    this.context = context;
  }

  error(message: string, trace: string) {
    const logMsg = this.formatLog(message, trace);
    fs.appendFile(
      join(process.cwd(), 'log', 'error.log'),
      logMsg,
      'utf-8',
      (err) => {
        if (err) throw err;
      },
    );
    super.error(logMsg);
  }

  warn(message: string) {
    const logMsg = this.formatLog(message);
    fs.appendFile(
      join(process.cwd(), 'log', 'warn.log'),
      logMsg,
      'utf-8',
      (err) => {
        if (err) throw err;
      });
    super.warn(logMsg);
  }

  log(message: string) {
    const logMsg = this.formatLog(message);
    fs.appendFile(
      join(process.cwd(), 'log', 'info.log'),
      logMsg,
      'utf-8',
      (err) => {
        if (err) {
          throw err;
        }
      },
    );
    super.log(logMsg);
  }

  debug(message: string, trace: string) {
    const logMsg = this.formatLog(message, trace);
    fs.appendFile(
      join(process.cwd(), 'log', 'debug.log'),
      logMsg,
      'utf-8',
      (err) => {
        if (err) throw err;
      },
    );
    super.debug(logMsg);
  }

  verbose(message: string, trace: string) {
    const logMsg = this.formatLog(message, trace);
    fs.appendFile(
      join(process.cwd(), 'log', 'verbose.log'),
      logMsg,
      'utf-8',
      (err) => {
        if (err) throw err;
      });
    super.verbose(logMsg);
  }

  private formatLog(message: string, trace?: string): string {
    let moduleName = '';
    if (this.context) {
      moduleName = `[${this.context}]`;
    }
    const now: Date = new Date();
    const time = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    if (trace) {
      return `${moduleName} [${time}] ${message} [${trace}]` + '\r\n';
    }
    return `${moduleName} [${time}] ${message}` + '\r\n';
  }
}
