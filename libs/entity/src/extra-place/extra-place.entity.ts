import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../location/location.entity';
import { PinPlace } from '../pin-place/pin-place.entity';
import { Province } from '../province/province.entity';
import { ReviewPost } from '../review-post/review-post.entity';
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

  @OneToMany(() => PinPlace, (pinPlace) => pinPlace.extraPlace)
  pinPlaces: PinPlace[];

  @OneToMany(() => ReviewPost, (reviewPost) => reviewPost.extraPlace, { nullable: true })
  reviewPosts: ReviewPost[];

  @CreateDateColumn()
  createdDate: Date;
}
