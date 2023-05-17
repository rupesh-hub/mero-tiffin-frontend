import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../_model/cart';
import { environment } from '../environments/environment';
import { ProductPagination } from '../_model/product-pagination';
import { ApiResponse } from '../_model/api-response';
import { Product } from '../_model/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartUrl: string = '/assets/cart.json';
  private cartBackUrl: string = environment.cartApiUrl;

  constructor(private _httpClient: HttpClient) {}

  addProductToCart$ = (cart: Cart): Observable<Cart | HttpErrorResponse> =>
    this._httpClient.post<Cart | HttpErrorResponse>(
      `${this.cartBackUrl}/add`,
      cart
    );

  cartItems$ = (
    userId: string,
    current: number = 1,
    size: number = 5
  ): Observable<ApiResponse<Product[]>> =>
    this._httpClient.get<any>(
      `${this.cartBackUrl}/paginated?userId=${userId}&current=${current}&size=${size}`
    );

  getCartSize$ = (userId: string): Observable<any> =>
    this._httpClient.get(`${this.cartBackUrl}/size/${userId}`);

    deleteCartItem$ = (productId: number): Observable<any> =>
    this._httpClient.get(`${this.cartBackUrl}/delete/${productId}`);
}
