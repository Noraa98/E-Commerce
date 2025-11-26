import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  private get headers() {
    const token = this.cookieService.get('userToken') || '';
    const headers = new HttpHeaders({ token });
    return { headers };
  }

  // Create cash order
  createCashOrder(cartId: string, shippingAddress: any): Observable<any> {
    const body = { shippingAddress };
    return this.httpClient.post(`${environment.baseUrl}orders/${cartId}`, body, this.headers);
  }

  // Create online payment session
  createOnlinePaymentSession(cartId: string, shippingAddress: any): Observable<any> {
    const body = { shippingAddress };
    const fallbackUrl = 'http://localhost:4200';
    const origin =
      typeof window !== 'undefined' && window?.location?.origin
        ? window.location.origin
        : fallbackUrl;
    const url = `${environment.baseUrl}orders/checkout-session/${cartId}?url=${encodeURIComponent(
      origin
    )}`;
    return this.httpClient.post(url, body, this.headers);
  }

  // Get all user orders
  getUserOrders() {
    // Try the user-specific endpoint first. Some backend deployments route
    // `/orders/user` incorrectly to `/:id` and return a 500 casting error
    // (Cast to ObjectId failed for value "user"). Fall back to `/orders`.
    return this.httpClient.get(`${environment.baseUrl}orders/user`, this.headers).pipe(
      catchError((err) => {
        const msg = err?.error?.message || err?.message || '';
        if (err?.status === 500 && /Cast to ObjectId/i.test(msg)) {
          // fallback to generic orders endpoint which may return the authenticated user's orders
          return this.httpClient.get(`${environment.baseUrl}orders`, this.headers);
        }
        return throwError(() => err);
      })
    );
  }
}
