import "./Expenses.scss";
import SavingsDisplay from "./SavingsDisplay";
import SpendingDisplay from "./SpendingDisplay";

function Expenses() {
  return (
    <div className="expenses-wrapper">
      <h1 className="visually-hidden">Expenses</h1>
      <SavingsDisplay />
      <SpendingDisplay />
    </div>
  );
}

export default Expenses;
