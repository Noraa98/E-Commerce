import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit {
  productList: Product[] = [];

private readonly productsService = inject(ProductsService)

  ngOnInit(): void {
    this.getAllPrpductsData();
   
  }

  // Get all products
  getAllPrpductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data)
        this.productList=res.data
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

}
