function BarGraph() {
  return (
    <div className="spending__graph-group">
      <h2 className="spending__heading">Spending - last 7 days</h2>
      <div className="spending__graph-wrapper">
        <svg className="spending__graph"></svg>
      </div>
    </div>
  );
}

export default BarGraph;
