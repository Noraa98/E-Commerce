import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CheckoutService } from './services/checkout.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllOrdersComponent implements OnInit {
  private readonly checkoutService = inject(CheckoutService);

  loading = signal(false);
  orders = signal<any[]>([]);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading.set(true);
    this.error.set(null);
    this.checkoutService.getUserOrders().subscribe({
      next: (res: any) => {
        this.loading.set(false);
        console.debug('getUserOrders response:', res);

        // Normalize response shapes:
        // - Array of orders
        // - { status: 'success', data: [...] }
        // - { data: { orders: [...] } }
        let items: any[] | null = null;

        if (Array.isArray(res)) {
          items = res as any[];
        } else if (res && res.status === 'success') {
          if (Array.isArray(res.data)) items = res.data;
          else if (Array.isArray(res.data?.orders)) items = res.data.orders;
        } else if (res && Array.isArray(res.data)) {
          items = res.data;
        } else if (res && Array.isArray(res.data?.orders)) {
          items = res.data.orders;
        }

        if (items && items.length > 0) {
          this.orders.set(items);
          this.error.set(null);
        } else {
          this.orders.set([]);
          this.error.set(res?.message || 'No orders found');
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message || 'Failed to load orders');
        console.error('Error loading orders:', err);
      },
    });
  }
}
