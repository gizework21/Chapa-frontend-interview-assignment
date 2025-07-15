"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { getUsers, toggleUserActive } from "@/lib/auth";
import { User, SystemStats } from "@/types";

const mockPayments = [
  { id: "1", username: "user1", total: 1500 },
  { id: "2", username: "admin1", total: 300 },
];

const mockStats: SystemStats = {
  totalUsers: 100,
  totalTransactions: 500,
  activeUsers: 80,
};

export default function SuperAdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [newAdminUsername, setNewAdminUsername] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  const handleToggleActive = async (id: string, isActive: boolean) => {
    const updatedUser = await toggleUserActive(id, !isActive);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  const handleAddAdmin = () => {
    if (newAdminUsername) {
      setUsers([
        ...users,
        {
          id: `${Date.now()}`,
          username: newAdminUsername,
          password: "temp123",
          role: "Admin",
          isActive: true,
        },
      ]);
      setNewAdminUsername("");
    }
  };

  const handleRemoveAdmin = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">SuperAdmin Dashboard</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="font-semibold">Total Users</p>
                <p>{mockStats.totalUsers}</p>
              </div>
              <div>
                <p className="font-semibold">Total Transactions</p>
                <p>{mockStats.totalTransactions}</p>
              </div>
              <div>
                <p className="font-semibold">Active Users</p>
                <p>{mockStats.activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Input
                placeholder="New admin username"
                value={newAdminUsername}
                onChange={(e) => setNewAdminUsername(e.target.value)}
              />
              <Button onClick={handleAddAdmin}>Add Admin</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users
                  .filter((user) => user.role === "Admin")
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.isActive ? "Active" : "Inactive"}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant={user.isActive ? "destructive" : "default"}
                            onClick={() => handleToggleActive(user.id, user.isActive)}
                          >
                            {user.isActive ? "Deactivate" : "Activate"}
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleRemoveAdmin(user.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.isActive ? "Active" : "Inactive"}</TableCell>
                    <TableCell>
                      <Button
                        variant={user.isActive ? "destructive" : "default"}
                        onClick={() => handleToggleActive(user.id, user.isActive)}
                      >
                        {user.isActive ? "Deactivate" : "Activate"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Total Payments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.username}</TableCell>
                    <TableCell>${payment.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}