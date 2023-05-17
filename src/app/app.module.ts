import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserManagementModule } from './user-management/user-management.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from './_shared/shared.module';
import { ProductManagementModule } from './product-management/product-management.module';
import { CartManagementModule } from './cart-management/cart-management.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInteceptor } from './_services/auth.interceptor';
import { PaginationComponent } from './components/pagination/pagination.component';
import { WishlistItemComponent } from './wishlist-management/wishlist-item/wishlist-item.component';
import { WishlistManagementModule } from './wishlist-management/wishlist-management.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DashboardComponent,
    NavbarComponent,
    PaginationComponent,
    WishlistItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserManagementModule,
    BrowserAnimationsModule,
    SharedModule,
    ProductManagementModule,
    CartManagementModule,
    HttpClientModule,
    WishlistManagementModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInteceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
