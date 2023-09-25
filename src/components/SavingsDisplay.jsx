import "./SavingsDisplay.scss";
import imgLogo from "../assets/images/logo.svg";

function SavingsDisplay({ balanceData }) {
  return (
    <div className="savings">
      <div className="savings__content">
        <h2 className="savings__heading">My balance</h2>
        <p className="savings__balance">{`$${
          !balanceData ? `0.00` : balanceData
        }`}</p>
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
