import { LikeEntity } from '../Likes/likes.entity';
import { ProviderAccountEntity } from '../ProviderAccount/providers.entity';
import { ReviewEntity } from '../Review/reviews.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { from } from 'rxjs';
import { ArticleListEntity } from '../ArticleList/articleList.entity';

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
}

@Entity('Items')
export class ItemEntity {
  @PrimaryGeneratedColumn()
  i_id: number;

  @Column()
  i_name: string;

  @Column()
  i_description: string;

  @Column({ nullable: true, type: 'money' })
  i_price: number;

  @Column({
    nullable: true,
    type: 'enum',
    enum: Categories,
    default: Categories.OTHER,
  })
  i_category: string;

  @Column({ nullable: true, type: 'decimal' })
  i_rating: number;

  @Column({
    nullable: true,
    type: 'enum', //might want to change nullable => false
    enum: ItemType,
  })
  i_type: string;

  @Column({ nullable: true, type: 'int', default: null })
  p_stock: number;

  @Column({ nullable: true, type: 'int', default: null })
  s_timeslot: number;

  @ManyToOne((type) => ProviderAccountEntity, (provider) => provider.items)
  @JoinColumn({ name: 'pa_id' })
  provider: ProviderAccountEntity[];

  @Column({ type: 'int', nullable: false })
  pa_id: number;

  @OneToMany((type) => ArticleListEntity, (articleList) => articleList.item_of_article)
  articleList: ArticleListEntity[];

  @OneToMany((type) => ReviewEntity, (rev) => rev.item)
  reviews: ReviewEntity[];

  @OneToMany((type) => LikeEntity, (like) => like.likes_item)
  likes: LikeEntity[];

  @Column({type: 'boolean', default:false})
  disabled: boolean;
}
