import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_model/product';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { ApiResponse } from '../_model/api-response';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseURL: string = '/assets/products.json';
  private productApiUrl: string = environment.productApiUrl;

  constructor(private _httpClient: HttpClient) {}

  public getAllProducts(
    limit: number
  ): Observable<Product[] | HttpErrorResponse> {
    return this._httpClient.get<Product[] | HttpErrorResponse>(
      `${this.baseURL}`
    );
  }

  allProducts$ = (
    page: number=1,
    limit: number=10
  ): Observable<ApiResponse<Product[]>> =>
    this._httpClient.post<any>(`${this.productApiUrl}/paginated`, {
      page: page,
      limit: limit,
    });

  getDataById(id: number): Observable<Product[]> {
    return this._httpClient.get<Product[]>(this.baseURL).pipe(
      map((data: Product[]) => data.filter((item: Product) => item?.id == id)),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return [];
      })
    );
  }
}
