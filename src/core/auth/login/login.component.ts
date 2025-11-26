import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Dependency Injection
  private authService = inject(AuthService);
  private router = inject(Router);
  private cookieService = inject(CookieService);

  // Signals
  loading = signal(false);
  errorMsg = signal<string | null>(null);

  // Form Definition
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required, 
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required, 
      Validators.minLength(6)
    ]),
  });

  // Helper Methods
  hasError(controlName: string, errorType: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control?.hasError(errorType) && control?.touched);
  }

  // Submit Method
  submit() {
    if (this.loginForm.invalid) return;

    this.loading.set(true);
    this.errorMsg.set(null);

    const payload = this.loginForm.getRawValue();

    this.authService.loginForm(payload).subscribe({
      next: (response) => {
        this.loading.set(false);
        
       
        if (response.token) {
          
          this.authService.saveToken(response.token);
          console.log('Token saved!');
          
        
          this.router.navigate(['/']).then(success => {
            console.log('Navigation success:', success);
          });
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMsg.set(err.error.message || 'Invalid email or password!');
      }
    });
  }
}