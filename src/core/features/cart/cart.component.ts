import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);

  cartDetails: Cart = {} as Cart;

  ngOnInit(): void {
    this.getLoggedUserData();
  }


  getLoggedUserData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (response) => {
        console.log('User cart data:', response.data);

        this.cartDetails = response.data;
      },
      error: (error) => {
        console.error('Error fetching user cart data:', error);
      }   
    });

  }

  removeItemFromCart(id: string): void {

    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (response) => {
        console.log('Item removed from cart successfully:', response);
        this.getLoggedUserData(); // Refresh cart data after removal
      },
      error: (error) => {
        console.error('Error removing item from cart:', error);
      }   
    });
  }

  updateItemQuantity(id: string, count: number): void {

    this.cartService.updateCartItemQuantity(id, count).subscribe({
      next: (response) => {
        console.log('Item quantity updated successfully:', response);
        this.getLoggedUserData(); // Refresh cart data after update
      },  
      error: (error) => {
        console.error('Error updating item quantity:', error);
      }   
    }); 
}}
