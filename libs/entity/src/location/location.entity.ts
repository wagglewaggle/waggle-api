import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ExtraPlace } from '../extra-place/extra-place.entity';
import { KtPlace } from '../kt-place/kt-place.entity';
import { SktPlace } from '../skt-place/skt-place.entity';

@Entity()
export class Location {
  @PrimaryColumn()
  idx: number;

  @Column('varchar')
  name: string;

  @OneToMany(() => KtPlace, (ktPlace) => ktPlace.location, { nullable: true })
  ktPlaces: KtPlace[];

  @OneToMany(() => SktPlace, (sktPlace) => sktPlace.location, { nullable: true })
  sktPlaces: SktPlace[];

  @OneToMany(() => ExtraPlace, (extraPlace) => extraPlace.location, { nullable: true })
  extraPlaces: ExtraPlace[];
}
