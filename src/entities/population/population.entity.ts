import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Place } from '../place/place.entity';
import { PopulationLevel } from './population.constant';

@Entity()
export class Population {
  @PrimaryGeneratedColumn()
  idx: number;

  @ManyToOne(() => Place, (place) => place.populations)
  place: Place;

  @Column('enum')
  level: PopulationLevel;

  @Column('text')
  message: string;

  @Column('int')
  male: number;

  @Column('int')
  female: number;

  @Column('int')
  zeroGen: number;

  @Column('int')
  teenager: number;

  @Column('int')
  twenties: number;

  @Column('int')
  thirties: number;

  @Column('int')
  fourties: number;

  @Column('int')
  fifties: number;

  @Column('int')
  sixties: number;

  @Column('int')
  seventies: number;

  @Column('int')
  resident: number;

  @Column('int')
  nonResident: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
