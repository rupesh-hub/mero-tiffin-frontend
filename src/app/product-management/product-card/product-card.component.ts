import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/_model/cart';
import { Product } from 'src/app/_model/product';
import { CartService } from 'src/app/_services/cart.service';
import { HeaderService } from 'src/app/_services/header.service';
import { tap } from 'rxjs/operators';
import { WishlistService } from 'src/app/_services/wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() public product: Product | any;
  @Input() public redirectLink: string | any;
  @Input() public buttonText: string | any;
  @Input() public isCartBtn: boolean | any;

  private cartSize: number | any;
  private favoriteSize: number | any;
  dummyImage: string = '/assets/images/images.jpg';

  constructor(
    private _headerService: HeaderService,
    private _cartService: CartService,
    private _wishlistService: WishlistService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._headerService.favorite
      .pipe(
        tap((size: number) => {
          this.favoriteSize = size;
        })
      )
      .subscribe();

    this._headerService.cartSize
      .pipe(
        tap((size: number) => {
          this.cartSize = size;
        })
      )
      .subscribe();
  }

  public addToCart(product: Product): void {
    let cart = new Cart(
      product.id,
      product.title,
      product.price,
      (product.quantity = 1),
      product.images[0],
      '9abc7257-5dd5-4195-aeb9-7fb8d03d486c'
    );

    this._cartService.addProductToCart$(cart).subscribe((response: any) => {
      if (response.status == 'OK') {
        this._headerService.cartSize.next(++this.cartSize);
        this._router.navigate(['/cart']);
      }
    });
  }

  public onClickFavorite(productId: number): void {
    this._wishlistService
      .addFavorite$(productId, '9abc7257-5dd5-4195-aeb9-7fb8d03d486c')
      .subscribe((response: any) => {
        if (response.status == 'OK') {
          this._headerService.favorite.next(++this.favoriteSize);
        }
      });
    
  }
}
