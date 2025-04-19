import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { BreadsService } from './breads.service';
import { Bread } from './types/bread.type';
import { CreateBreadDto } from './dto/create-bread.dto';
import { UpdateBreadDto } from './dto/update-bread.dto';

@Controller('breads')
export class BreadsController {
  constructor(private readonly breadsService: BreadsService) {}

  @Get('/gay')
  gay(): string {
    throw new Error('균게이');
  }

  @Get()
  findAll(): Bread[] {
    return this.breadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Bread | undefined {
    return this.breadsService.findOne(+id);
  }

  @Post()
  create(@Body() createBreadDto: CreateBreadDto): Bread {
    return this.breadsService.create(createBreadDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBreadDto: UpdateBreadDto): Bread | undefined {
    return this.breadsService.update(+id, updateBreadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): { success: boolean } {
    return { success: this.breadsService.remove(+id) };
  }
}
