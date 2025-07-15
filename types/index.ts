export type Role = "User" | "Admin" | "SuperAdmin";

interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  role: string;
  isActive: boolean;
  walletBalance: number;
  transactions: Transaction[];
}

export interface SystemStats {
  totalUsers: number;
  totalTransactions: number;
  activeUsers: number;
}
