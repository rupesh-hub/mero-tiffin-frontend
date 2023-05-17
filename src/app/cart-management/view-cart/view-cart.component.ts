import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/_model/product';
import { CartService } from 'src/app/_services/cart.service';
import { HeaderService } from 'src/app/_services/header.service';
import { catchError, map, startWith, of, Observable, tap } from 'rxjs';
import { ApiResponse } from 'src/app/_model/api-response';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewCartComponent implements OnInit, OnDestroy {
  itemState$: Observable<any>;

  public cartItems!: Product[] | any;
  public shopDetails: any;
  public dummyImage: string = '/assets/images/images.jpg';

  currentPage = 1;
  pages: any;

  totalRecords: number = 0;
  pageSize: number = 5;
  page: number = 0;
  cartSize: number = 0;

  private shippingCharge: number = 150;

  constructor(
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

    this.getCartItems();
  }

  ngOnDestroy(): void {
    this._headerService.backLink.next(false);
    this._headerService.headerNav.next(true);
  }

  public getCartItems(): void {
    this.itemState$ = this._cartService
      .cartItems$(
        '9abc7257-5dd5-4195-aeb9-7fb8d03d486c',
        this.currentPage,
        this.pageSize
      )
      .pipe(
        map((response: ApiResponse<Product[]> | any) => {
          this.cartItems = response.data;
          this.calculateShopDetails();
          this.pages = response.pagination.totalPages;
          return { status: 'LOADED', data: response };
        }),
        startWith({ status: 'LOADING' }),
        catchError((error: HttpErrorResponse) => of({ status: 'ERROR', error }))
      );
  }

  private calculateShopDetails(): void {
    let subTotal = 0;
    let quantity = 0;

    this.cartItems.forEach((product: any) => {
      quantity += product.quantity;
      subTotal += product.subTotal * product.quantity;
    });
    
    this.shopDetails = {
      subTotal: subTotal,
      shippingCharge: this.shippingCharge,
      estimatedTotal: subTotal + this.shippingCharge,
      quantity: quantity,
    };
  }

  onPageChanged(page: number): void {
    if (page >= 1 && page <= this.pages) {
      this.currentPage = page;
      this.getCartItems();
    }
  }

  range(length: number) {
    return Array.from({ length }, (value, key) => key);
  }

  public deleteCartItem(productId: number) {
    this._cartService.deleteCartItem$(productId).subscribe(
      (response)=>{
        if(response.status = 200){
          this._headerService.cartSize.next(--this.cartSize);
          this.getCartItems();
        }
      }
    );
  }
}
