import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartManagementModule } from './cart-management/cart-management.module';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'products',
    loadChildren: () =>
      import('./product-management/product-management.module').then(
        (m) => m.ProductManagementModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user-management/user-management.module').then(
        (m) => m.UserManagementModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./cart-management/cart-management.module').then(
        (m) => m.CartManagementModule
      ),
  },
  {
    path: 'wishlist',
    loadChildren: () =>
      import('./wishlist-management/wishlist-management.module').then(
        (m) => m.WishlistManagementModule
      ),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
