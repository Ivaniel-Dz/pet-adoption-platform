import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageInvalidComponent } from '../../components/message-invalid-component/message-invalid-component';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink, MessageInvalidComponent],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  // Inyecciones
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Estados
  loading = signal(false);
  errorMessage = signal('');

  // Formulario
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4)]],
    phone: [''],
    address: [''],
  });

  signUp() {
    // Validar formulario
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // Iniciar loading
    this.loading.set(true);

    this.authService.register(this.registerForm.getRawValue() as any).subscribe({
      next: () => {
        // Detener loading
        this.loading.set(false);

        // Redirigir al login
        this.router.navigate(['/login']);
      },

      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set('Ya el usuario existe');
        console.error(err);
      },
    });
  }
}
