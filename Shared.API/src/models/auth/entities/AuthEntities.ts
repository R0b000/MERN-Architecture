// Auth Models - Entities
export interface User {
  _id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Role {
  _id?: string;
  name: string;
  permissions: string[];
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
