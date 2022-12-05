import { ItemEntity } from '../Item/items.entity';
import { UserAccountEntity } from '../UserAccount/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum Status {
  REQUESTED = 'requested',
  ACCEPTED = 'accepted', //by provider
  REJECTED = 'rejected', //by provider
  CANCELED = 'canceled', //by user. If canceled, not interactive.
  PAID = 'paid',
  SENT = 'sent',
  COMPLETED = 'completed', //by user. If completed, not interactive.
  USERNOTFOUND = 'user not found', //on user deleted. Not interactive.
}


@Entity('Request')
export class RequestEntity {
  @PrimaryGeneratedColumn()
  req_id: number;

  @Column({ type: 'money' })
  req_totalprice: number;

  @Column({ default: new Date(), type: 'timestamp' }) //find ways to set a default date of "now"
  req_date: Date;

  @ManyToOne((type) => ItemEntity, (item) => item.requests)
  @JoinColumn({ name: 'i_id' })
  item: ItemEntity[];

  @Column({ nullable: true, type: 'int' })
  i_id: number;

  @ManyToOne((type) => UserAccountEntity, (user) => user.requests)
  @JoinColumn({ name: 'u_id' })
  user: UserAccountEntity[];

  @Column({ type: 'int', nullable: true })
  u_id: number;

  @Column({type:'enum', enum: Status})
  status: string;

  @Column({type: 'boolean', default:false})
  disabled: boolean;
}
