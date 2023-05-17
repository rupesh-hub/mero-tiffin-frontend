import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from 'src/app/_services/header.service';
import { WishlistService } from 'src/app/_services/wishlist.service';
import { catchError, map, startWith, of, Observable, tap } from 'rxjs';
import { Product } from 'src/app/_model/product';
import { ApiResponse } from 'src/app/_model/api-response';
import { HttpErrorResponse } from '@angular/common/http';
import { Cart } from 'src/app/_model/cart';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss'],
})
export class WishlistItemComponent implements OnInit, OnDestroy {
  itemState$: Observable<any>;

  public shopDetails: any;
  public dummyImage: string = '/assets/images/images.jpg';

  currentPage = 1;
  pages: any;

  totalRecords: number = 0;
  pageSize: number = 5;
  page: number = 0;
  public cartSize: number;
  public wishlistSize: number;

  constructor(
    private _wishlistService: WishlistService,
    private _headerService: HeaderService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this._headerService.backLink.next(true);
    this._headerService.headerNav.next(false);

    this._headerService.cartSize
      .pipe(
        tap((size: number) => {
          this.cartSize = size;
        })
      )
      .subscribe();

      this._headerService.favorite
      .pipe(
        tap((size: number) => {
          this.wishlistSize = size;
        })
      )
      .subscribe();

    this.getwishlistItems();
  }

  ngOnDestroy(): void {
    this._headerService.backLink.next(false);
    this._headerService.headerNav.next(true);
  }

  private getwishlistItems(): void {
    this.itemState$ = this._wishlistService
      .wishlistItems$(
        '9abc7257-5dd5-4195-aeb9-7fb8d03d486c',
        this.currentPage,
        this.pageSize
      )
      .pipe(
        map((response: ApiResponse<Product[]> | any) => {
          this.pages = response.pagination.totalPages;
          return { status: 'LOADED', data: response };
        }),
        startWith({ status: 'LOADING' }),
        catchError((error: HttpErrorResponse) => of({ status: 'ERROR', error }))
      );
  }

  onPageChanged(page: number): void {
    if (page >= 1 && page <= this.pages) {
      this.currentPage = page;
      this.getwishlistItems();
    }
  }

  range(length: number) {
    return Array.from({ length }, (value, key) => key);
  }

  public addToCart(product: any): void {
    console.log(product);

    let cart = new Cart(
      product?.productId,
      product?.title,
      product?.price,
      (product.quantity = 1),
      this.dummyImage,
      '9abc7257-5dd5-4195-aeb9-7fb8d03d486c'
    );

    this._cartService.addProductToCart$(cart).subscribe((response: any) => {
      if (response.status == 'OK') {
        this._headerService.cartSize.next(++this.cartSize);
        //after adding to cart remove wishlist item by product id
        this.deleteWishlist(product?.productId)
      }
    });
  }

  public deleteWishlist(productId: number) {
    this._wishlistService
      .deleteWishlist$(productId)
      .subscribe(() => {
        this.getwishlistItems();
        this._headerService.favorite.next(--this.wishlistSize);
      });
  }
}
