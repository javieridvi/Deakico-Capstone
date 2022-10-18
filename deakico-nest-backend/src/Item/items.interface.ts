export interface Item {
    i_id?: number;
    i_name?: string;
    i_description?: string; 
    i_price?: number; 
    i_rating?: number;
    i_type?: string;
    p_stock?: number;   //for products only
    s_timeslot?: number;  //for services only
    pa_id?: number;
    req_id?: number;
} 