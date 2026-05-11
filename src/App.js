import React, { useEffect, useState } from "react";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import BalanceDisplay from "./BalanceDisplay";
import "./App.css";

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [activePage, setActivePage] = useState("form");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("");

  const [darkMode, setDarkMode] = useState(false);



  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);


  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);


  const addTransaction = (transaction) => {
    setTransactions([
      ...transactions,
      {
        ...transaction,
        id: Date.now(),
        date: new Date().toLocaleString(),
      },
    ]);
  };


  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((item) => item.id !== id));
  };


  let filteredTransactions = [...transactions];

  if (filter !== "All") {
    filteredTransactions = filteredTransactions.filter((item) =>
      item.category === filter
    );
  }

  filteredTransactions = filteredTransactions.filter((item) =>
    item.description.toLowerCase().includes(search.toLowerCase())
  );

if (sort === "low") {
  filteredTransactions.sort((a, b) => a.amount - b.amount);
}

if (sort === "high") {
  filteredTransactions.sort((a, b) => b.amount - a.amount);
}

if (sort === "newest") {
  filteredTransactions.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
}

if (sort === "oldest") {
  filteredTransactions.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
}

  return (
    <div className="app">
      <h1>Finance Tracker</h1>


    <div
  className={`toggle ${darkMode ? "active" : ""}`}
  onClick={() => setDarkMode(!darkMode)}
>
  <div className="toggle-circle"></div>
</div>


      <BalanceDisplay transactions={transactions} />


    <div className="top-buttons">
  <button
    className={activePage === "form" ? "active" : ""}
    onClick={() => setActivePage("form")}
  >
   Create Record
  </button>

  <button
    className={activePage === "list" ? "active" : ""}
    onClick={() => setActivePage("list")}
  >
    Transaction History
  </button>
</div>

   

      {activePage === "form" && (
        <TransactionForm addTransaction={addTransaction} />
      )}

     

      {activePage === "list" && (
        <>
          <div className="controls">
            <input
              type="text"
              placeholder="Search description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

     <select value={sort} onChange={(e) => setSort(e.target.value)}>
  <option value="">Sort By</option>
  <option value="low">Amount: Low → High</option>
  <option value="high">Amount: High → Low</option>
  <option value="newest">Date: Newest First</option>
  <option value="oldest">Date: Oldest First</option>
</select>
          </div>

          <TransactionList
            transactions={filteredTransactions}
            deleteTransaction={deleteTransaction}
          />
        </>
      )}
    </div>
  );
}