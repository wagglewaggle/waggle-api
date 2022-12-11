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

  @Column('varchar')
  poiId: string;

  @Column('varchar')
  name: string;

  @Column('decimal', { precision: 17, scale: 15 })
  x: number;

  @Column('decimal', { precision: 17, scale: 14 })
  y: number;

  @ManyToOne(() => Province, (province) => province.sktPlaces)
  province: Province;

  @OneToMany(() => SktPopulation, (sktPopulation) => sktPopulation.place)
  populations: SktPopulation[];
}
