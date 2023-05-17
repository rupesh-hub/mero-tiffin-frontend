import { Pagination } from "./pagination";
import { Product } from "./product";

export interface ProductPagination {
    message:string;
    status:any;
    statusCode:number;
    timeStamp:any;
    data:Product[];
    pagination:Pagination;
} 