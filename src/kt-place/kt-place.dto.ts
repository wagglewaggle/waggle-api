import { IsEnum, IsOptional } from 'class-validator';
import { KtPopulationLevel } from 'waggle-entity/dist/kt-population/kt-population.constant';
import { ListFilterQueryDto } from '../app/app.dto';

export class KtPlaceListFilterQueryDto extends ListFilterQueryDto {
  @IsOptional()
  @IsEnum(KtPopulationLevel)
  level: KtPopulationLevel;
}
