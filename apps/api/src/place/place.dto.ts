import { IsOptional } from 'class-validator';
import { ListFilterQueryDto } from '../app/app.dto';
import { PopulationLevel } from './place.constant';

export class PlaceListFilterQueryDto extends ListFilterQueryDto {
  level?: PopulationLevel;
}
