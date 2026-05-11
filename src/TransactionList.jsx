import React from "react";

function TransactionList({
  transactions,
  deleteTransaction,
}) {
  return (
    <div className="list">
      {transactions.length === 0 ? (
        <p>No Transactions</p>
      ) : (
        transactions.map((item) => (
          <div className="card" key={item.id}>
            <div>
              <h3>{item.description}</h3>
              <p>{item.category}</p>
              <small>{item.date}</small>
            </div>

            <div>
              <h2>₹{item.amount}</h2>
              <button onClick={() => deleteTransaction(item.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TransactionList