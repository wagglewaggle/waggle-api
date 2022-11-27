import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Place } from '../place/place.entity';

@Entity()
export class Province {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar')
  name: string;

  @OneToMany(() => Place, (place) => place.province)
  places: Place[];
}
