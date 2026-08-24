import { Role } from "../../config/appConfig";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
