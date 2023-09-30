import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryTypeModule } from '../category-type/category-type.module';

@Module({
  imports: [CategoryTypeModule],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
