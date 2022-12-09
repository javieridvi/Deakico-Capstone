export interface ArticleList {
    getAllArticleLists(): import("rxjs").Observable<ArticleList[]>;
    req_id?: number;
    i_id?: number;
    qty?: number;
    priceAtReq?: number;
}