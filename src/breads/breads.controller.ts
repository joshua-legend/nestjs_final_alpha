import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { BreadsService } from './breads.service';
import { Bread } from './types/bread.type';
import { CreateBreadDto } from './dto/create-bread.dto';
import { UpdateBreadDto } from './dto/update-bread.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@Controller('breads')
export class BreadsController {
  constructor(private readonly breadsService: BreadsService) {}

  @Get('/gay')
  gay(): string {
    throw new Error('균게이');
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Bread[] {
    return this.breadsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): Bread | undefined {
    return this.breadsService.findOne(+id);
  }

  @Public()
  @Post()
  create(@Body() createBreadDto: CreateBreadDto): Bread {
    return this.breadsService.create(createBreadDto);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBreadDto: UpdateBreadDto): Bread | undefined {
    return this.breadsService.update(+id, updateBreadDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string): { success: boolean } {
    return { success: this.breadsService.remove(+id) };
  }
}
