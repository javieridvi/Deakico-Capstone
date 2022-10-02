import { LikeEntity } from 'src/Likes/likes.entity';
import { ProviderAccountEntity } from 'src/ProviderAccount/providers.entity';
import { RequestEntity } from 'src/Request/requests.entity';
import { ReviewEntity } from 'src/Review/reviews.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, Like } from 'typeorm';

@Entity('Items')
export class ItemEntity {
    @PrimaryGeneratedColumn()
    i_id: number;

    @Column()
    i_name: string;
    
    @Column()
    i_description: string; 
    
    @Column({ nullable: true , type: 'money'})
    i_price: number; 
    
    @Column({ nullable: true})
    i_category: string;

    @Column( { nullable: true, type: 'decimal'})
    i_rating: number;

    @ManyToOne(type => ProviderAccountEntity, provider => provider.items) 
    @JoinColumn({name: 'pa_id'})
    provider: ProviderAccountEntity[];

    @Column({type: 'int', nullable: true})
    pa_id: number;
    
    @ManyToOne(type => RequestEntity, req => req.items)
    @JoinColumn({name: 'req_id' })
    request: RequestEntity[];

    @Column({ type: 'int', nullable: true})
    req_id: number;

    @OneToMany(type => ReviewEntity, rev => rev.item)
    reviews: ReviewEntity[];

    @OneToMany(type => LikeEntity, like => like.likes_item)
    likes: LikeEntity[];

}