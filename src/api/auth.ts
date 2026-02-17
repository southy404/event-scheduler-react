export interface LoginResponse {
  token: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}
