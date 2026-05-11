import React, { useState } from "react";

 function TransactionForm({ addTransaction }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Income");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !description) {
      alert("Please fill all fields");
      return;
    }

    addTransaction({
      amount: Number(amount),
      description,
      category,
    });

    setAmount("");
    setDescription("");
    setCategory("Income");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>

      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm