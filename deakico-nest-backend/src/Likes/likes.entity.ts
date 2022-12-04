import { ItemEntity } from '../Item/items.entity';
import { UserAccountEntity } from '../UserAccount/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('Likes')
export class LikeEntity {
  @ManyToOne((type) => UserAccountEntity, (user) => user.likes)
  @JoinColumn({ name: 'u_id' })
  user_likes: UserAccountEntity[];

  @ManyToOne((type) => ItemEntity, (item) => item.likes)
  @JoinColumn({ name: 'i_id' })
  likes_item: ItemEntity[];

  @PrimaryColumn({ type: 'int' })
  u_id: number;

  @PrimaryColumn({ type: 'int' })
  i_id: number;

  @Column({type: 'timestamp', nullable: true})
  l_date: Date;
}
