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
  getPets(params: {
    // Parametros opcionales para filtrar y paginar
    page?: number;
    search?: string;
    status?: string;
    species?: string;
    size?: string;
  }) {
    // Construimos los parámetros de consulta para la solicitud HTTP
    const query = new URLSearchParams();

    // Agregamos los parámetros a la consulta si están presentes
    if (params.page) query.append('page', params.page.toString());
    if (params.search) query.append('search', params.search);
    if (params.status) query.append('status', params.status);
    if (params.species) query.append('species', params.species);
    if (params.size) query.append('size', params.size);

    return this.http.get<any>(`${this.apiUrl}/pets/?${query.toString()}`);
  }

  // Obtener los detalles de una mascota por su ID
  getPetById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/pets/${id}/`);
  }
}
