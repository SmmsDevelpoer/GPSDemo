import { Module } from '@nestjs/common';
import { LogRecordService } from './logger.service';

@Module({
  providers: [LogRecordService],
  exports: [LogRecordService],
})
export class LoggerModule {
}