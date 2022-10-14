import { type } from 'os';
import { FollowEntity } from 'src/Follows/follows.entity';
import { ItemEntity } from 'src/Item/items.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum Categories {
    HAIR = "hair",
    PASTRY = "pastry",
    FOOD = "food",
    CLOTHING = "clothing",
    CLEANING = "cleaning",
    JEWELRY = "jewelry",
    OTHER = "other" 
}

@Entity('Provider Account')
export class ProviderAccountEntity {
    @PrimaryGeneratedColumn()
    pa_id: number;

    @Column()
    pa_companyname: string;
    
    @Column({ default: 0, type: 'decimal'})
    pa_rating: number; 
    
    @Column({ default: 0, type: 'int'})
    pa_followers: number; 
    
    @Column({ nullable: true, type: 'enum', 
            enum: Categories})
    pa_category: string;

    @OneToMany(type => ItemEntity, item => item.provider) 
    items: ItemEntity[];

    @OneToMany(type => FollowEntity, follow => follow.follows_provider)
    follows: FollowEntity[];

}