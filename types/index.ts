export type Role = "User" | "Admin" | "SuperAdmin";

export interface User {
  id: string;
  username: string;
  password: string; 
  role: Role;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
}

export interface SystemStats {
  totalUsers: number;
  totalTransactions: number;
  activeUsers: number;
}