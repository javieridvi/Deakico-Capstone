import { ItemEntity } from "../Item/items.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { RequestEntity } from "../Request/requests.entity";

@Entity('ArticleList')
export class ArticleListEntity {
    @PrimaryColumn({type: 'int'})
    req_id: number;

    @PrimaryColumn({type: 'int'})
    i_id: number;

    @Column({type: 'int', default: 1})
    qty: number;

    @Column({type: 'money', default:0})
    priceAtReq: number;

    @ManyToOne((type) => RequestEntity, (req) => req.articleList)
    @JoinColumn({ name: 'req_id' })
    article_request: RequestEntity[];
  
    @ManyToOne((type) => ItemEntity, (item) => item.articleList)
    @JoinColumn({ name: 'i_id' })
    item_of_article: ItemEntity[];
}