import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


export function passwordMatch(group: AbstractControl) {
  return group.get('password')?.value === group.get('rePassword')?.value
    ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  // 1. Dependency Injection (Services)
  private authService = inject(AuthService);
  private router = inject(Router);

  // 2. Signals & Properties
  loading = signal(false);
  errorMsg = signal<string | null>(null);

  // 3. Form Definition
  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(20)
    ]),
    email: new FormControl('', [
      Validators.required, 
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required, 
      Validators.minLength(6), 
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    ]),
    rePassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required, 
      Validators.pattern(/^(01)[0-9]{9}$/)
    ]),
  }, { validators: [passwordMatch] }); 

  // 4. Helper Methods
  hasError(controlName: string, errorType: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control?.hasError(errorType) && control?.touched);
  }

  hasPasswordMismatch(): boolean {
    return !!(
      this.registerForm.hasError('mismatch') && 
      this.registerForm.get('rePassword')?.touched
    );
  }

  // 5. Main Methods
  submit() {
    if (this.registerForm.invalid)
      {
        this.registerForm.markAllAsTouched();
      }

    this.loading.set(true);
    this.errorMsg.set(null);

    this.authService.registerForm(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);

        if (res.message === 'success') {
          this.loading.set(false);
          setTimeout(() => {
           this.router.navigate(['/login']); 
          }, 2000); 
        }
        
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMsg.set(err.error.message || 'Something went wrong!');
      }
    });
  }
}