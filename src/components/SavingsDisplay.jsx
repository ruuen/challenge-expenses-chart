import imgLogo from "../assets/images/logo.svg";

function SavingsDisplay() {
  return (
    <div className="savings">
      <div className="savings__content">
        <h2 className="savings__heading">My balance</h2>
        <p className="savings__balance">$921.48</p>
      </div>
      <img
        src={imgLogo}
        alt="Bank logo of two overlapping circles"
        className="savings__logo"
      />
    </div>
  );
}

export default SavingsDisplay;
