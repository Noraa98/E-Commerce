import { CookieService } from 'ngx-cookie-service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import e from 'express';

export const authGuard: CanActivateFn = (route, state) => {

  // Check if userToken exists in cookies
  const cookieService = inject(CookieService);
  const router = inject(Router);


 const token = cookieService.get('userToken');
  
  console.log('Auth Guard - Token:', token);

  if (token) {
    console.log('Auth Guard - Access granted');
    return true; 
  } else {
    console.log('Auth Guard - Redirecting to login');
    return router.parseUrl('/login');
  }
};
