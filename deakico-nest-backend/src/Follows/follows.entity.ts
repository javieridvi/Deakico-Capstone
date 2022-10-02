
import { ProviderAccountEntity } from 'src/ProviderAccount/providers.entity';
import { UserAccountEntity } from 'src/UserAccount/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('Follows')
export class FollowEntity {
    @PrimaryGeneratedColumn()
    f_id: number;

    @ManyToOne(type => UserAccountEntity, user => user.follows)
    @JoinColumn( { name: 'u_id'} )
    user_follows: UserAccountEntity[];

    @ManyToOne(type => ProviderAccountEntity, pa => pa.follows)
    @JoinColumn({ name: 'pa_id'})
    follows_provider: ProviderAccountEntity[];

    @Column({ type: 'int', nullable: false })
    u_id: number;

    @Column({ type: 'int', nullable: false })
    pa_id: number;

}