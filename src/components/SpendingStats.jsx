function SpendingStats() {
  return (
    <div className="spending__statistics">
      <div className="spending__stat-group">
        <h2 className="spending__subheading">Total this month</h2>
        <p className="spending__value spending__value--large">$478.33</p>
      </div>
      <div className="spending__stat-group">
        <p className="spending__value">+2.4%</p>
        <p className="spending__subheading">from last month</p>
      </div>
    </div>
  );
}

export default SpendingStats;
