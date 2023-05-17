import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WishlistItemComponent } from './wishlist-item/wishlist-item.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';

const routes: Routes = [
  {
    path: '',
    children: [{ path: '', component: WishlistItemComponent }],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
  ]
})
export class WishlistManagementModule {}
