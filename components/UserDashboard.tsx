"use client";

import { useState } from "react";
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
import { useAuthStore } from "@/lib/store";

const mockTransactions = [
  { id: "1", amount: 100, date: "2025-07-10", description: "Grocery Store" },
  { id: "2", amount: 50, date: "2025-07-09", description: "Coffee Shop" },
  { id: "3", amount: 200, date: "2025-07-08", description: "Online Purchase" },
];

export default function UserDashboard() {
  const { user } = useAuthStore();
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null);

  const handleTransaction = () => {
    if (transactionAmount) {
      setTransactionStatus(`Transaction of $${transactionAmount} initiated!`);
      setTransactionAmount("");
      setTimeout(() => setTransactionStatus(null), 3000); // Clear status after 3s
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">User Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$1,234.56</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Initiate Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Enter amount"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
              />
              <Button onClick={handleTransaction}>Submit</Button>
            </div>
            {transactionStatus && (
              <p className="mt-2 text-green-500">{transactionStatus}</p>
            )}
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
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