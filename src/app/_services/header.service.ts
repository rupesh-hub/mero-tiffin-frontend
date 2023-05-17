import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';
import { WishlistService } from './wishlist.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {

  isLoggedIn: any = new BehaviorSubject(false);
  backLink: any = new BehaviorSubject(false);
  headerNav: any = new BehaviorSubject(true);
  cartSize: any = new BehaviorSubject(0);
  favorite: any = new BehaviorSubject(0);

  constructor(private _cartSevice: CartService,
    private _wishlistService:WishlistService) {
    this._cartSevice
      .getCartSize$('9abc7257-5dd5-4195-aeb9-7fb8d03d486c')
      .subscribe((cartSize) => {
        this.cartSize.next(cartSize);
      });

      this._wishlistService
      .favoriteSize$('9abc7257-5dd5-4195-aeb9-7fb8d03d486c')
      .subscribe((size) => {
        this.favorite.next(size);
      });
  }
}
