import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cctv } from '../cctv/cctv.entity';
import { KtAccident } from '../kt-accident/kt-accident.entity';
import { KtPopulation } from '../kt-population/kt-population.entity';
import { Province } from '../province/province.entity';

@Entity()
export class KtPlace {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar')
  name: string;

  @Column('double')
  x: number;

  @Column('double')
  y: number;

  @ManyToOne(() => Province, (province) => province.ktPlaces)
  province: Province;

  @OneToMany(() => KtPopulation, (population) => population.place)
  populations: KtPopulation[];

  @OneToMany(() => KtAccident, (accident) => accident.place)
  accidents: KtAccident[];

  @OneToMany(() => Cctv, (cctv) => cctv.place)
  cctvs: Cctv[];
}
