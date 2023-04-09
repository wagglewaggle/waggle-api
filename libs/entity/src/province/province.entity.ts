import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ExtraPlace } from '../extra-place/extra-place.entity';
import { KtPlace } from '../kt-place/kt-place.entity';
import { SktPlace } from '../skt-place/skt-place.entity';

@Entity()
export class Province {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar')
  name: string;

  @OneToMany(() => KtPlace, (place) => place.province)
  ktPlaces: KtPlace[];

  @OneToMany(() => SktPlace, (sktPlace) => sktPlace.province)
  sktPlaces: SktPlace[];

  @OneToMany(() => ExtraPlace, (extraPlace) => extraPlace.province)
  extraPlaces: ExtraPlace[];
}
