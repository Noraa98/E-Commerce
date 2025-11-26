import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('userToken');

  console.log('isLogged Guard - Token:', token);

  if (token) {
    console.log('isLogged Guard - Redirecting to home');
    
    return router.parseUrl('/');
  } else {
    console.log('isLogged Guard - Access granted to login');
    return true; 
  }
};