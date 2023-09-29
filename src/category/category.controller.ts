import { Controller } from '@nestjs/common';
import { ApiPath } from './category.constant';

@Controller(ApiPath.Root)
export class CategoryController {}
