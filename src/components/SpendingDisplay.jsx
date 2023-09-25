import "./SpendingDisplay.scss";
import BarGraph from "./BarGraph";
import SpendingStats from "./SpendingStats";

function SpendingDisplay({ spendingData }) {
  return (
    <div className="spending">
      <BarGraph graphData={spendingData.thisWeek} />
      <SpendingStats
        thisMonth={spendingData.thisMonth}
        lastMonthPercent={spendingData.lastMonthDelta}
      />
    </div>
  );
}

export default SpendingDisplay;
