import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  isAuthenticated = signal<boolean>(this.isLoggedIn());

  registerForm(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl +'auth/signup',data);
  }

  loginForm(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl +'auth/signin',data);
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.get('userToken'); 
  }

  //Save token
  saveToken(token: string): void {
    this.cookieService.set('userToken', token, { 
      expires: 7, // 7 days
      path: '/',
      sameSite: 'Lax'
    });
    this.isAuthenticated.set(true);
  }

  // Get token
  getToken(): string {
    return this.cookieService.get('userToken');
  }

  // Logout
  logout(): void {
    this.cookieService.delete('userToken', '/');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}
