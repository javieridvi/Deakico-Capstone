import { ItemEntity } from 'src/Item/items.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('Request')
export class RequestEntity {
    @PrimaryGeneratedColumn()
    req_id: number;

    @Column({ type: 'money'})
    req_totalprice: number;
    
    @Column({ default: new Date(), type: 'timestamp'})       //find ways to set a default date of "now"
    req_date: Date;  

    @Column({ nullable: true, type: 'int'})
    i_id: number;

    @ManyToOne(type => ItemEntity, item => item.requests) 
    @JoinColumn( {name: 'i_id'})
    item: ItemEntity[];

}