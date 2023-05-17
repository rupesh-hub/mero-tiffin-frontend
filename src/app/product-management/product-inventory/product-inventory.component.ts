import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_model/product';
import { ProductService } from 'src/app/_services/product.service';
import { Observable, map, startWith, catchError, of } from 'rxjs';
import { ApiResponse } from 'src/app/_model/api-response';

@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.scss'],
})
export class ProductInventoryComponent implements OnInit {
  itemState$: Observable<any>;

  currentPage = 1;
  pages: any;
  totalRecords: number = 0;
  pageSize: number = 20;

  constructor(private _productService: ProductService) {}

  ngOnInit() {
    this.allProducts();
  }

  private allProducts(): void {
    this.itemState$ = this._productService
      .allProducts$(this.currentPage, this.pageSize)
      .pipe(
        map((response: ApiResponse<Product[]> | any) => {
          this.pages = response.pagination.totalPages;
          return { status: 'LOADED', data: response };
        }),
        startWith({ status: 'LOADING' }),
        catchError((error: HttpErrorResponse) => of({ status: 'ERROR', error }))
      );
  }

  onPageChanged(page: number): void {
    if (page >= 1 && page <= this.pages) {
      this.currentPage = page;
      this.allProducts();
    }
  }

  range(length: number) {
    return Array.from({ length }, (value, key) => key);
  }

}
