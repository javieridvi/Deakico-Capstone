import { ItemEntity } from '../Item/items.entity';
import { UserAccountEntity } from '../UserAccount/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('Review')
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  r_id: number;

  @Column({ default: '' })
  r_message: string;

  @Column({ default: 0, type: 'decimal' })
  r_rating: number;

  @ManyToOne((type) => UserAccountEntity, (user) => user.reviews)
  @JoinColumn({ name: 'u_id' })
  user: UserAccountEntity[];

  @Column({ type: 'int', nullable: true })
  u_id: number;

  @ManyToOne((type) => ItemEntity, (item) => item.reviews)
  @JoinColumn({ name: 'i_id' })
  item: ItemEntity[];

  @Column({ type: 'int', nullable: true })
  i_id: number;

  @Column({ type: 'timestamp', nullable: true})
  r_date: Date;

  @Column({type: 'boolean', default:false})
  disabled: boolean;
}
