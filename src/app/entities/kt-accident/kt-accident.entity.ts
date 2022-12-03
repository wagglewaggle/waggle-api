import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { KtPlace } from '../kt-place/kt-place.entity';

@Entity()
export class KtAccident {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  type: string;

  @Column('varchar')
  dtype: string;

  @Column('text')
  info: string;

  @Column('int')
  x: number;

  @Column('int')
  y: number;

  @ManyToOne(() => KtPlace, (place) => place.accidents)
  place: KtPlace;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
