import { Module } from '@nestjs/common';
import { BreadsService } from './breads.service';
import { BreadsController } from './breads.controller';

@Module({
  controllers: [BreadsController],
  providers: [BreadsService],
})
export class BreadsModule {}
