import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_model/product';
import { HeaderService } from 'src/app/_services/header.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent implements OnInit, OnDestroy {
  public product: any;
  private productId: any;
  public isCartBtn: boolean = true;

  constructor(
    private _productService: ProductService,
    private _activedRoute: ActivatedRoute,
    private _headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this._headerService.backLink.next(true);
    this._headerService.headerNav.next(false);

    this.productId = this._activedRoute.snapshot.paramMap.get('productId');
    this.getProduct(this.productId);
  }

  ngOnDestroy(): void {
    this._headerService.backLink.next(false);
    this._headerService.headerNav.next(true);
  }

  private getProduct(id: number): void {
    this._productService.getDataById(id).subscribe(
      (response: Product[]) => {
        console.log(response);

        this.product = response[0];
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
