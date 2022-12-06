import { ProviderAccountEntity } from '../ProviderAccount/providers.entity';
import { UserAccountEntity } from '../UserAccount/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('Follows')
export class FollowEntity {
  @ManyToOne((type) => UserAccountEntity, (user) => user.follows)
  @JoinColumn({ name: 'u_id' })
  user_follows: UserAccountEntity[];

  @ManyToOne((type) => ProviderAccountEntity, (pa) => pa.follows)
  @JoinColumn({ name: 'pa_id' })
  follows_provider: ProviderAccountEntity[];

  @PrimaryColumn({ type: 'int' })
  u_id: number;

  @PrimaryColumn({ type: 'int' })
  pa_id: number;

  @Column({ type: 'timestamp', default: new Date()})
  f_date: Date;
}
