export type PetSpecies = 'Perro' | 'Gato';

export type PetSize = 'Pequeño' | 'Mediano' | 'Grande';

export type PetStatus = 'AVAILABLE' | 'ADOPTED';

export interface Pet {
  id: number;

  name: string;

  species: PetSpecies;

  breed?: string;

  age?: number;

  size: PetSize;

  description?: string;

  image_url?: string | null;

  status: PetStatus;

  created_by: number; // ID del usuario

  created_at: string; // ISO date
}
