import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToOne(() => KtPlace, (place) => place.ktRoadTraffic)
  @JoinColumn()
  ktPlace: KtPlace;
}
