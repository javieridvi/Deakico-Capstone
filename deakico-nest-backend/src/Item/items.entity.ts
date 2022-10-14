import { LikeEntity } from 'src/Likes/likes.entity';
import { ProviderAccountEntity } from 'src/ProviderAccount/providers.entity';
import { RequestEntity } from 'src/Request/requests.entity';
import { ReviewEntity } from 'src/Review/reviews.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

//enumerator for categories. Keep adding categories as we see fit.
export enum Categories {
    HAIR = "hair",
    PASTRY = "pastry",
    FOOD = "food",
    CLOTHING = "clothing",
    OTHER = "other" 
}

export enum ItemType {
    PRODUCT = "product",
    SERVICE = "service"
}

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
    
    @Column({ nullable: true, type: 'enum',
            enum: Categories, default: Categories.OTHER})
    i_category: string;

    @Column( { nullable: true, type: 'decimal'})
    i_rating: number;

    @Column( {nullable: true, type: 'enum',  //might want to change nullable => false
            enum: ItemType})
    i_type: string;

    @Column( {nullable: true, type: 'int', default: null})
    p_stock: number;

    @Column( {nullable: true, default: null, type: 'timestamp'})
    s_timeslot: Date;

    @ManyToOne(type => ProviderAccountEntity, provider => provider.items) 
    @JoinColumn({name: 'pa_id'})
    provider: ProviderAccountEntity[];

    @Column({type: 'int', nullable: true})
    pa_id: number;
    
    @OneToMany(type => RequestEntity, req => req.item)
    requests: RequestEntity[];

    @OneToMany(type => ReviewEntity, rev => rev.item)
    reviews: ReviewEntity[];

    @OneToMany(type => LikeEntity, like => like.likes_item)
    likes: LikeEntity[];

}