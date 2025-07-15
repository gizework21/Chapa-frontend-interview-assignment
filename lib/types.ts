export interface User {
  id: number;
  name: string;
  active: boolean;
  email?: string;
  username?: string;
  role: "User" | "Admin" | "SuperAdmin";
  password?: string; // Optional for display purposes, not for storage
}

export interface Transaction {
  id: number;
  recipient: string;
  amount: number;
  date: string;
}

export interface Stats {
  totalPayments: number;
  activeUsers: number;
}