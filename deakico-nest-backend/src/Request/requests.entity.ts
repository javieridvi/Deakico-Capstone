import { ItemEntity } from 'src/Item/items.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('Request')
export class RequestEntity {
    @PrimaryGeneratedColumn()
    req_id: number;

    @Column({ type: 'money'})
    req_totalprice: number;
    
    @Column({ default: new Date(), type: 'timestamp'})       //find ways to set a default date of "now"
    req_date: Date; 
    
    @Column()     //this attribute might be redundant
    req_type: string;  

    @OneToMany(type => ItemEntity, item => item.request) 
    items: ItemEntity[];

}