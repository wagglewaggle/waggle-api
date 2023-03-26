import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reply } from '../reply/reply.entity';
import { User } from '../user/user.entity';

@Entity()
export class ReplyReport {
  @PrimaryGeneratedColumn()
  idx: number;

  @ManyToOne(() => Reply, (reply) => reply.reports)
  reply: Reply;

  @ManyToOne(() => User, (user) => user.replyReports)
  user: User;
}
