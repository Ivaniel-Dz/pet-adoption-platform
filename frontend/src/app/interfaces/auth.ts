// Login
export interface Login {
  email: string;
  password: string;
}

// Respuesta del login
export interface LoginResponse {
  access: string;
}

// Registro
export interface Register {
  email: string;
  username: string;
  password: string;
  phone?: string;
  address?: string;
}
