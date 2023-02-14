import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SktPlace } from '../skt-place/skt-place.entity';
import { SktPopulationLevel } from './skt-population.constant';

@Entity()
export class SktPopulation {
  @PrimaryGeneratedColumn()
  idx: number;

  @OneToOne(() => SktPlace, (place) => place.population)
  @JoinColumn()
  place: SktPlace;

  @Column('enum', { enum: SktPopulationLevel })
  level: SktPopulationLevel;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
