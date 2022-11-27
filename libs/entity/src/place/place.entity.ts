import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Accident } from '../accident/accident.entity';
import { Population } from '../population/population.entity';
import { Province } from '../province/province.entity';

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar')
  name: string;

  @Column('int')
  x: number;

  @Column('int')
  y: number;

  @ManyToOne(() => Province, (province) => province.places)
  province: Province;

  @OneToMany(() => Population, (population) => population.place)
  populations: Population[];

  @OneToMany(() => Accident, (accident) => accident.place)
  accidents: Accident[];
}
