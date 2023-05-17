import { Pagination } from "./pagination";

export interface ApiResponse<T> {
    message:string;
    status:any;
    statusCode:number;
    timeStamp:any;
    data:T;
    pagination:Pagination;

}