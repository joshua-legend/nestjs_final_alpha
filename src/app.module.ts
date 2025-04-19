import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BreadsModule } from './breads/breads.module';

@Module({
  imports: [BreadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
