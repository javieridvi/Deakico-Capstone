import { ItemEntity } from 'src/Item/items.entity';
import { UserAccountEntity } from 'src/UserAccount/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('Likes')
export class LikeEntity {
    @PrimaryGeneratedColumn()
    l_id: number;

    @ManyToOne(type => UserAccountEntity, user => user.likes)
    @JoinColumn( { name: 'u_id'} )
    user_likes: UserAccountEntity[];

    @ManyToOne(type => ItemEntity, item => item.likes)
    @JoinColumn({ name: 'i_id'})
    likes_item: ItemEntity[];

    @Column({ type: 'int', nullable: false })
    u_id: number;

    @Column({ type: 'int', nullable: false })
    i_id: number;

}