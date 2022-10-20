import { FollowEntity } from 'src/Follows/follows.entity';
import { ItemEntity } from 'src/Item/items.entity';
import { LikeEntity } from 'src/Likes/likes.entity';
import { ProviderAccountEntity } from 'src/ProviderAccount/providers.entity';
import { RequestEntity } from 'src/Request/requests.entity';
import { ReviewEntity } from 'src/Review/reviews.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('User Account')
export class UserAccountEntity {
    @PrimaryGeneratedColumn()
    u_id: number;

    @Column()
    u_firstname: string;
    
    @Column()       //find ways to set a default date of "now"
    u_lastname: string; 
    
    @Column()     //this attribute might be redundant
    email: string;  

    @Column()
    username: string;

    @Column() //consider {select: false} for better security
    password: string;  

    @OneToMany(type => FollowEntity, follow => follow.user_follows)
    follows: FollowEntity[];

    @OneToMany(type => LikeEntity, like => like.user_likes )
    likes: LikeEntity[];

    @OneToOne(type => ProviderAccountEntity)
    @JoinColumn({name: 'pa_id'})
    user_pa: ProviderAccountEntity[];

    @Column({ type: 'int', nullable: true})
    pa_id: number;

    @OneToMany(type => ReviewEntity, rev => rev.user)
    reviews: ReviewEntity[];

    @OneToMany(type => RequestEntity, req => req.user)
    requests: RequestEntity[];
}