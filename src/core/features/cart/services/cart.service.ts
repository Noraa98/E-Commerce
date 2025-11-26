import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  private get headers() {
    return {
      headers: {
        token: this.cookieService.get('userToken')
    
      }
    };
  }
  addProductToCart(id: string):Observable<any> {
    const body = {
      productId: id,
    };
    return this.httpClient.post(
      environment.baseUrl+'cart', body, this.headers);
  }

  getLoggedUserCart():Observable<any> {
    return this.httpClient.get(
      environment.baseUrl+'cart', this.headers);
  }

  removeSpecificCartItem(id: string):Observable<any> {
    return this.httpClient.delete(
      environment.baseUrl+'cart/'+id, this.headers);
  }
  
  updateCartItemQuantity(id: string, count: number):Observable<any> { 
    const body = {
      count: count,
    };
    return this.httpClient.put(
      environment.baseUrl+'cart/'+id, body, this.headers);
  }
}
