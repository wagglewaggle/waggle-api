import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../category/category.entity';
import { Cctv } from '../cctv/cctv.entity';
import { KtAccident } from '../kt-accident/kt-accident.entity';
import { KtPopulation } from '../kt-population/kt-population.entity';
import { KtRoadTraffic } from '../kt-road-traffic/kt-road-traffic.entity';
import { Location } from '../location/location.entity';
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

  @OneToOne(() => KtRoadTraffic, (roadTraffic) => roadTraffic.ktPlace)
  ktRoadTraffic: KtRoadTraffic;

  @ManyToOne(() => Province, (province) => province.ktPlaces)
  province: Province;

  @ManyToOne(() => Location, (location) => location.ktPlaces, { nullable: true })
  location: Location;

  @OneToMany(() => Category, (category) => category.ktPlace)
  categories: Category[];

  @OneToMany(() => KtPopulation, (population) => population.place)
  populations: KtPopulation[];

  @OneToMany(() => KtAccident, (accident) => accident.place)
  accidents: KtAccident[];

  @OneToMany(() => Cctv, (cctv) => cctv.place)
  cctvs: Cctv[];
}
