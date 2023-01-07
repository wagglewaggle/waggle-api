import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { KtPlace } from '../kt-place/kt-place.entity';

@Entity()
export class KtRoadTraffic {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('text')
  info: string;

  @Column('varchar')
  type: string;

  @Column('int')
  avgSpeed: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToOne(() => KtPlace, (place) => place.ktRoadTraffic)
  @JoinColumn()
  ktPlace: KtPlace;
}
