import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  // Inyectamos el HttpClient para realizar solicitudes HTTP
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Obtener la lista de mascotas
  getPets(page: number = 1) {
    return this.http.get<any>(`${this.apiUrl}/pets/?page=${page}`);
  }
}
