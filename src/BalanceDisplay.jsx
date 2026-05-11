import React from "react";

 function BalanceDisplay({ transactions }) {
  const income = transactions
    .filter((item) => item.category === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expense = transactions
    .filter((item) => item.category === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expense;

  return (
    <div className="balance-box">
      <h2>Balance: ₹{balance}</h2>

      <div className="money">
        <p>Income: ₹{income}</p>
        <p>Expense: ₹{expense}</p>
      </div>
    </div>
  );
}

export default BalanceDisplay