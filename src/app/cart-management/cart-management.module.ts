import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { SharedModule } from '../_shared/shared.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    children: [{ path: '', component: ViewCartComponent }],
  },
];

@NgModule({
  declarations: [ViewCartComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, FormsModule],
})
export class CartManagementModule {}
