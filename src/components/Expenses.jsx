import { useState, useEffect } from "react";
import "./Expenses.scss";
import SavingsDisplay from "./SavingsDisplay";
import SpendingDisplay from "./SpendingDisplay";

const initialState = {
  balance: 0,
  spending: {
    thisMonth: 0,
    lastMonthDelta: 0,
    thisWeek: [],
  },
};

function Expenses() {
  const [expenseData, setExpenseData] = useState(initialState);

  useEffect(() => {
    fetch("/api/expenses")
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((data) => setExpenseData(data))
      .catch((err) => console.log(`Failed to fetch expense data. ${err}`));
  }, []);

  return (
    <div className="expenses-wrapper">
      <h1 className="visually-hidden">Expenses</h1>
      <SavingsDisplay balanceData={expenseData.balance} />
      <SpendingDisplay spendingData={expenseData.spending} />
    </div>
  );
}

export default Expenses;
