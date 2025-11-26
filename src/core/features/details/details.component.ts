import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { Product } from '../../models/product.interface';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);

  id: string | null = null;
  productDetails :Product ={} as Product;

  ngOnInit(): void {
    this.getProductId();
    this.getProductDetailsData();
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id');
      },
    });
  }

  getProductDetailsData(): void {
    this.productDetailsService.getProductDetails(this.id).subscribe({

      next: (res) => {
        console.log(res.data)
        this.productDetails = res.data;
      },
      error: (err) => {
        console.error('Error loading product:', err);
      }
    });
  }

  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService)

          
  
    addProductItemToCart(id: string): void {
      this.cartService.addProductToCart(id).subscribe({
        next: (response) => {
          console.log('Product added to cart successfully:', response);
          if(response.status === 'success'){
            this.toastrService.success(response.message, 'FreshCart');
          }
        },
        error: (error) => {
          console.error('Error adding product to cart:', error);
        }
      });     
    }
  

}
