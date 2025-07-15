"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function TransactionForm() {
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null);

  const handleTransaction = () => {
    if (transactionAmount) {
      setTransactionStatus(`Transaction of $${transactionAmount} initiated!`);
      setTransactionAmount("");
      setTimeout(() => setTransactionStatus(null), 3000);
    }
  };

  return (
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
  );
}
