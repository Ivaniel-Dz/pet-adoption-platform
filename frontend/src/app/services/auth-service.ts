import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Login, LoginResponse, Register } from '../interfaces/auth';
import { Observable, tap } from 'rxjs';
import { UserProfile } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Inyecciones de dependencias
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Guarda el token de acceso en una señal reactiva temporalmente
  accessToken = signal<string | null>(null);
  currentUser = signal<UserProfile | null>(null);

  // Método para registrar un nuevo usuario
  register(data: Register): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register/`, data);
  }

  // Método para iniciar session
  login(data: Login): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/users/login/`, data, {
        // Asegura que las cookies de sesión se incluyan en la solicitud
        withCredentials: true,
      })
      .pipe(
        // Guarda el token de acceso en la señal reactiva cuando se recibe la respuesta, solo en memoria
        tap((response) => {
          this.accessToken.set(response.access);
        }),
      );
  }

  // Método para refrescar el token
  refreshToken(): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/users/refresh/`,
        {},
        {
          withCredentials: true,
        },
      )
      .pipe(
        tap((response) => {
          this.accessToken.set(response.access);
        }),
      );
  }

  // Método para cerrar sesión
  logout(): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/users/logout/`,
        {},
        {
          withCredentials: true,
        },
      )
      .pipe(
        tap(() => {
          // Limpia la memoria
          this.accessToken.set(null);
          this.currentUser.set(null);
        }),
      );
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.currentUser();
  }
}
