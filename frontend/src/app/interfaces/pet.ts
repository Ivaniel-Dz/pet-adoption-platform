// Valores reales que vienen del backend (DB)
export type PetSpecies = 'DOG' | 'CAT';

export type PetSize = 'SMALL' | 'MEDIUM' | 'LARGE';

export type PetStatus = 'AVAILABLE' | 'ADOPTED';

export interface Pet {
  id: number;

  name: string;

  // Valor interno (para lógica)
  species: PetSpecies;
  // Valor legible (para UI)
  species_display: string;

  breed?: string;

  age?: number;

  // Valor interno (para lógica)
  size: PetSize;
  // Valor legible (para UI)
  size_display: string;

  description?: string;

  image_url?: string | null;

  // Valor interno (para lógica)
  status: PetStatus;
  // Valor legible (para UI)
  status_display: string;

  created_by: number;

  created_at: string;
}
