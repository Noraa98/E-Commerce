import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart/services/cart.service';
import { CheckoutService } from './services/checkout.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly checkoutService = inject(CheckoutService);
  private readonly router = inject(Router);

  checkoutForm!: FormGroup;
  
  loading = signal(false);
  errorMsg = signal<string | null>(null);
  paymentMethod = signal<'cash' | 'online'>('cash');
  
  // Cart data
  cartData = signal<any>(null);
  cartId = signal<string>('');

  ngOnInit(): void {
    this.initForm();
    this.loadCart();
  }

  initForm(): void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required, Validators.minLength(10)]],
        city: [null, [Validators.required, Validators.minLength(3)]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
      })
    });
  }

  loadCart(): void {
    this.loading.set(true);
    this.cartService.getLoggedUserCart().subscribe({
      next: (response) => {
        console.log('Cart data:', response);
        this.loading.set(false);
        
        if (response.status === 'success') {
          this.cartData.set(response.data);
          this.cartId.set(response.data._id);
          
          // Redirect if cart is empty
          if (!response.data.products || response.data.products.length === 0) {
            this.router.navigate(['/cart']);
          }
        }
      },
      error: (err) => {
        console.error('Error loading cart:', err);
        this.loading.set(false);
        this.router.navigate(['/cart']);
      }
    });
  }

  hasError(groupName: string, controlName: string, errorType: string): boolean {
    const control = this.checkoutForm.get(groupName)?.get(controlName);
    return !!(control?.hasError(errorType) && control?.touched);
  }

  setPaymentMethod(method: 'cash' | 'online'): void {
    this.paymentMethod.set(method);
  }

  getCartItemsCount(): number {
    return this.cartData()?.products?.length || 0;
  }

  getCartTotalPrice(): number {
    return this.cartData()?.totalCartPrice || 0;
  }

  submit(): void {
    if (this.checkoutForm.invalid) {
      // Mark all fields as touched
      Object.keys(this.checkoutForm.controls).forEach(key => {
        const control = this.checkoutForm.get(key);
        control?.markAsTouched();
        if (control instanceof FormGroup) {
          Object.keys(control.controls).forEach(subKey => {
            control.get(subKey)?.markAsTouched();
          });
        }
      });
      return;
    }

    if (!this.cartId()) {
      this.errorMsg.set('Cart not found!');
      return;
    }

    this.loading.set(true);
    this.errorMsg.set(null);

    const shippingAddress = this.checkoutForm.value.shippingAddress;

    if (this.paymentMethod() === 'cash') {
      // Cash on delivery
      this.checkoutService.createCashOrder(this.cartId(), shippingAddress).subscribe({
        next: (response) => {
          this.loading.set(false);
          console.log('Order created:', response);
          
          if (response.status === 'success') {
            // Clear local cart data
            this.cartData.set(null);
            
            // Redirect to success page
            this.router.navigate(['/allorders']);
          }
        },
        error: (err) => {
          this.loading.set(false);
          this.errorMsg.set(err.error.message || 'Failed to create order!');
          console.error('Checkout error:', err);
        }
      });
    } else {
      // Online payment
      this.checkoutService.createOnlinePaymentSession(this.cartId(), shippingAddress).subscribe({
        next: (response) => {
          this.loading.set(false);
          console.log('Payment session:', response);
          
          if (response.status === 'success' && response.session?.url) {
            // Redirect to payment gateway
            window.location.href = response.session.url;
          } else {
            this.errorMsg.set('Failed to create payment session!');
          }
        },
        error: (err) => {
          this.loading.set(false);
          this.errorMsg.set(err.error.message || 'Failed to create payment session!');
          console.error('Checkout error:', err);
        }
      });
    }
  }
}