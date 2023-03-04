import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../location/location.entity';
import { Province } from '../province/province.entity';
import { ExtraPlaceStatus } from './extra-place.constant';

@Entity()
export class ExtraPlace {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar')
  name: string;

  @Column('double')
  x: number;

  @Column('double')
  y: number;

  @Column('varchar')
  address: string;

  @Column('enum', { enum: ExtraPlaceStatus })
  status: ExtraPlaceStatus;

  @ManyToOne(() => Location, (location) => location.extraPlaces, { nullable: true })
  location: Location;

  @ManyToOne(() => Province, (province) => province.extraPlaces)
  province: Province;

  @CreateDateColumn()
  createdDate: Date;
}
