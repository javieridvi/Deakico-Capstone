import { type } from 'os';
import { FollowEntity } from '../Follows/follows.entity';
import { ItemEntity } from '../Item/items.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum Categories {
  HAIR = 'hair',
  PASTRY = 'pastry',
  FOOD = 'food',
  CLOTHING = 'clothing',
  CLEANING = 'cleaning',
  JEWELRY = 'jewelry',
  OTHER = 'other',
}

export enum ItemType {
  PRODUCT = 'product',
  SERVICE = 'service',
  BOTH = 'both',
}

@Entity('Provider Account')
export class ProviderAccountEntity {
  @PrimaryGeneratedColumn()
  pa_id: number;

  @Column()
  pa_companyname: string;

  @Column({ nullable: true })
  pa_desc: string;

  @Column({ default: 0, type: 'decimal' })
  pa_rating: number;

  @Column({ nullable: false, type: 'enum', enum: Categories })
  pa_category: string;

  @Column({ nullable: false, type: 'enum', enum: ItemType})
  pa_type: string;

  @OneToMany((type) => ItemEntity, (item) => item.provider)
  items: ItemEntity[];

  @OneToMany((type) => FollowEntity, (follow) => follow.follows_provider)
  follows: FollowEntity[];

  @Column({type: 'boolean', default:false})
  disabled: boolean;
}
