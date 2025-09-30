import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { Product } from '../../../../models/product.interface';
import { ProductsService } from '../../../../services/products/products.service';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css'
})
export class PopularProductsComponent  implements OnInit {
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
