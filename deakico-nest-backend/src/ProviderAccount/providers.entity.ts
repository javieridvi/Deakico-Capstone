import { type } from 'os';
import { FollowEntity } from 'src/Follows/follows.entity';
import { ItemEntity } from 'src/Item/items.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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
    
    @Column({ nullable: true})
    pa_category: string;

    @OneToMany(type => ItemEntity, item => item.provider) 
    items: ItemEntity[];

    @OneToMany(type => FollowEntity, follow => follow.follows_provider)
    follows: FollowEntity[];

}