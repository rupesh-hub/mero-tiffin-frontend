import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { HeaderService } from 'src/app/_services/header.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  isLoggedIn: boolean | any;
  backLink: boolean | any;
  headerNav: boolean | any;
  cartSize!: number;
  wishlistSize:number;

  constructor(
    private _headerService: HeaderService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this._headerService.isLoggedIn.subscribe((response: boolean) => {
      this.isLoggedIn = response;
    });

    this._headerService.backLink.subscribe((response: boolean) => {
      this.backLink = response;
    });

    this._headerService.headerNav.subscribe((response: boolean) => {
      this.headerNav = response;
    });

    this._headerService.cartSize.subscribe((response: number) => {
      this.cartSize = response;
    });

    this._headerService.favorite.subscribe((response: any) => {
      this.wishlistSize = response;
    });
  }

  public logoutUser(): void {
    this._authService.logoutUser();
    this._router.navigate(['/user/login']);
  }
}
