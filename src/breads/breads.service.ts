import { Injectable } from '@nestjs/common';
import { Bread } from './types/bread.type';
import { CreateBreadDto } from './dto/create-bread.dto';
import { UpdateBreadDto } from './dto/update-bread.dto';

@Injectable()
export class BreadsService {
  private breads: Bread[] = [
    {
      id: 1,
      name: '크로와상',
      price: 3000,
      description: '바삭하고 부드러운 프랑스식 페이스트리',
    },
    {
      id: 2,
      name: '바게트',
      price: 2500,
      description: '프랑스 전통 빵',
    },
    {
      id: 3,
      name: '소금빵',
      price: 2000,
      description: '일본식 소금 맛 빵',
    },
  ];

  findAll(): Bread[] {
    return this.breads;
  }

  findOne(id: number): Bread | undefined {
    return this.breads.find((bread) => bread.id === id);
  }

  create(createBreadDto: CreateBreadDto): Bread {
    const newBread = {
      id: this.breads.length + 1,
      ...createBreadDto,
    };
    this.breads.push(newBread);
    return newBread;
  }

  update(id: number, updateBreadDto: UpdateBreadDto): Bread | undefined {
    const index = this.breads.findIndex((b) => b.id === id);
    if (index === -1) return undefined;

    this.breads[index] = { ...this.breads[index], ...updateBreadDto };
    return this.breads[index];
  }

  remove(id: number): boolean {
    const initialLength = this.breads.length;
    this.breads = this.breads.filter((bread) => bread.id !== id);
    return this.breads.length !== initialLength;
  }
}
