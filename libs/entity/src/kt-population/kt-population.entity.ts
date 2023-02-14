import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { KtPlace } from '../kt-place/kt-place.entity';
import { KtPopulationLevel } from './kt-population.constant';

@Entity()
export class KtPopulation {
  @PrimaryGeneratedColumn()
  idx: number;

  @OneToOne(() => KtPlace, (place) => place.population)
  @JoinColumn()
  place: KtPlace;

  @Column('enum', { enum: KtPopulationLevel })
  level: KtPopulationLevel;

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
  forties: number;

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
