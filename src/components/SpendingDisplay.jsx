import BarGraph from "./BarGraph";
import SpendingStats from "./SpendingStats";

function SpendingDisplay() {
  return (
    <div className="spending">
      <BarGraph />
      <SpendingStats />
    </div>
  );
}

export default SpendingDisplay;
