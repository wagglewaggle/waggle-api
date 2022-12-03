import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Province } from '../province/province.entity';
import { SktPopulation } from '../skt-population/skt-population.entity';

@Entity()
export class SktPlace {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('int')
  poiId: number;

  @Column('varchar')
  name: string;

  @ManyToOne(() => Province, (province) => province.sktPlaces)
  province: Province;

  @OneToMany(() => SktPopulation, (sktPopulation) => sktPopulation.place)
  populations: SktPopulation[];
}
