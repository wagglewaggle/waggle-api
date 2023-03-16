import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExtraPlace } from '../extra-place/extra-place.entity';
import { KtPlace } from '../kt-place/kt-place.entity';
import { SktPlace } from '../skt-place/skt-place.entity';
import { CategoryType } from './category.constant';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('enum', { enum: CategoryType })
  type: CategoryType;

  @ManyToOne(() => KtPlace, (ktPlace) => ktPlace.categories)
  ktPlace: KtPlace;

  @ManyToOne(() => SktPlace, (sktPlace) => sktPlace.categories)
  sktPlace: SktPlace;

  @ManyToOne(() => ExtraPlace, (extraPlace) => extraPlace.categories)
  extraPlace: ExtraPlace;
}
