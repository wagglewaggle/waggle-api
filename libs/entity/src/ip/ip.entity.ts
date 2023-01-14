import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IpStatus } from './ip.constant';

@Entity()
export class Ip {
  @PrimaryColumn()
  idx: number;

  @Column('varchar')
  address: string;

  @Column('enum', { enum: IpStatus })
  status: IpStatus;
}
