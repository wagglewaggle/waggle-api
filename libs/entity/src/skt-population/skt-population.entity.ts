import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SktPlace } from '../skt-place/skt-place.entity';
import { SktPopulationLevel } from './skt-population.constant';

@Entity()
export class SktPopulation {
  @PrimaryGeneratedColumn()
  idx: number;

  @ManyToOne(() => SktPlace, (place) => place.populations)
  place: SktPlace;

  @Column('simple-enum', { enum: SktPopulationLevel })
  level: SktPopulationLevel;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
