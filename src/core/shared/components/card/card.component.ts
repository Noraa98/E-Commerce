import { Component, inject, Input, input } from '@angular/core';
import { Product } from '../../../models/product.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-card',
   standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({required : true}) product : Product = {} as Product ;

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
