import { IsEnum, IsOptional } from 'class-validator';
import { SktPopulationLevel } from 'waggle-entity/dist/skt-population/skt-population.constant';
import { ListFilterQueryDto } from '../app/app.dto';

export class SktPlaceListFilterQueryDto extends ListFilterQueryDto {
  @IsOptional()
  @IsEnum(SktPopulationLevel)
  level: SktPopulationLevel;
}
