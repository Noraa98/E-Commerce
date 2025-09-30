import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { Product } from '../../models/product.interface';
import { ProductsService } from '../../services/products/products.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  productList: Product[] = [];

  p: number = 1; // Current page
  pageSize: number = 10; // Items per page
  total: number = 0; // Total items
  isLoading: boolean = false;

  private readonly productsService = inject(ProductsService);

  ngOnInit(): void {
    this.getAllPrpductsData();
  }

  // Get all products
  getAllPrpductsData(pageNumber: number = 1): void {
    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total =res.results;

      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }
}
