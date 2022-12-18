import { IsEnum, IsOptional } from 'class-validator';
import { SktPopulationLevel } from '@lib/entity/skt-population/skt-population.constant';
import { ListFilterQueryDto } from '../app/app.dto';

export class SktPlaceListFilterQueryDto extends ListFilterQueryDto {
  @IsOptional()
  @IsEnum(SktPopulationLevel)
  level: SktPopulationLevel;
}
