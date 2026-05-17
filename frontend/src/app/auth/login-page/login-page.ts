import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Navigation } from '../../layouts/navigation/navigation';
import { MessageInvalidComponent } from '../../components/message-invalid-component/message-invalid-component';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, Navigation, MessageInvalidComponent, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  // Inyecciones
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Estados
  loading = signal(false);
  errorMessage = signal('');

  // Formulario de login
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  // Método de login
  signIn() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.login(this.loginForm.getRawValue() as any).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      },

      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Usuario o contraseña incorrectos');
      },
    });
  }
}
