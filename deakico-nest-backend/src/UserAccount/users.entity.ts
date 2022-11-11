import { FollowEntity } from '../Follows/follows.entity';
import { LikeEntity } from '../Likes/likes.entity';
import { ProviderAccountEntity } from '../ProviderAccount/providers.entity';
import { RequestEntity } from '../Request/requests.entity';
import { ReviewEntity } from '../Review/reviews.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { type } from 'os';

@Entity('User Account')
@Unique(['username', 'email'])
export class UserAccountEntity {
  @PrimaryGeneratedColumn()
  u_id: number;

  @Column()
  u_firstname: string;

  @Column() //find ways to set a default date of "now"
  u_lastname: string;

  @Column() //this attribute might be redundant
  email: string;

  @Column()
  username: string;

  @Column() //consider {select: false} for better security
  password: string;

  @OneToMany((type) => FollowEntity, (follow) => follow.user_follows)
  follows: FollowEntity[];

  @OneToMany((type) => LikeEntity, (like) => like.user_likes)
  likes: LikeEntity[];

  @OneToOne((type) => ProviderAccountEntity)
  @JoinColumn({ name: 'pa_id' })
  user_pa: ProviderAccountEntity[];

  @Column({ type: 'int', nullable: true })
  pa_id: number;

  @OneToMany((type) => ReviewEntity, (rev) => rev.user)
  reviews: ReviewEntity[];

  @OneToMany((type) => RequestEntity, (req) => req.user)
  requests: RequestEntity[];
}
