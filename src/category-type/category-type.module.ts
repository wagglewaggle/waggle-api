import { Module } from '@nestjs/common';
import { CategoryTypeService } from './category-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryType } from 'waggle-entity/dist/category-type/category-type.entity';
import { CategoryTypeRepository } from './category-type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryType])],
  providers: [CategoryTypeService, CategoryTypeRepository],
  exports: [TypeOrmModule, CategoryTypeService],
})
export class CategoryTypeModule {}
