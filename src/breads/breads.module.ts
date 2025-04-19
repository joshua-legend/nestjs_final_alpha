import { Module } from '@nestjs/common';
import { BreadsController } from './breads.controller';
import { BreadsService } from './breads.service';

@Module({
  controllers: [BreadsController],
  providers: [BreadsService],
})
export class BreadsModule {}
