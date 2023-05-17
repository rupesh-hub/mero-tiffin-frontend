import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../_shared/shared.module';
import { ProductInventoryComponent } from './product-inventory/product-inventory.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ProductCardComponent } from './product-card/product-card.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: '', component: ProductInventoryComponent },
      { path: ':productId', component: ViewProductComponent }
    ]
  }
];

@NgModule({
  declarations: [ProductInventoryComponent, ViewProductComponent, ProductCardComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class ProductManagementModule {}
