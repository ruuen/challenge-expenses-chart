import "./SpendingStats.scss";

function SpendingStats() {
  return (
    <div className="spending__statistics">
      <div>
        <h2 className="spending__subheading">Total this month</h2>
        <p className="spending__value spending__value--large">$478.33</p>
      </div>
      {/* TODO: Make SR read these out as one single sentence if possible */}
      {/* Tried role of text which seemed to work once but never again. */}
      <div className="spending__stat-group" role="text">
        <span className="spending__value">+2.4%</span>
        <span className="spending__subheading">from last month</span>
      </div>
    </div>
  );
}

export default SpendingStats;
