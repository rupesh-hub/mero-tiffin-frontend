import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../_model/api-response';
import { Product } from '../_model/product';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {

  private wishlistApiUrl: string = environment.wishlistApiUrl;

  constructor(private _httpClient: HttpClient) {}

  addFavorite$ = (productId: number, userId: string): Observable<any> =>
    this._httpClient.post<any>(`${this.wishlistApiUrl}/add`, {
      productId: `${productId}`,
      userId: `${userId}`,
    });

    favoriteSize$ = (userId: string): Observable<any> =>
    this._httpClient.get<any>(`${this.wishlistApiUrl}/size/${userId}`);

    wishlistItems$ = (
      userId: string,
      current: number = 1,
      size: number = 5
    ): Observable<ApiResponse<Product[]>> =>
      this._httpClient.get<any>(
        `${this.wishlistApiUrl}/paginated?userId=${userId}&current=${current}&size=${size}`
      );

      deleteWishlist$ = (
        productId: number
      ): Observable<ApiResponse<Product[]>> =>
        this._httpClient.get<any>(
          `${this.wishlistApiUrl}/delete/${productId}`
        );
}
