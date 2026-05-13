import React, { useEffect, useState, useContext } from "react";
import axios from "../axiosConfig";
import GeneralContext from "./GeneralContext";

const Funds = () => {

  const [funds, setFunds] = useState(null);

  const { refreshHoldings } = useContext(GeneralContext);

  const token = localStorage.getItem("token");

const fetchFunds = React.useCallback(async () => {

  try {

    const res = await axios.get(
      "https://tradeonix.onrender.com/funds",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setFunds(res.data);

  } catch (err) {
    console.log(err);
  }

}, [token]);

useEffect(() => {
  fetchFunds();
}, [refreshHoldings, fetchFunds]);

  // ================= ADD FUNDS =================

  const handleAddFunds = async () => {

    const amount = prompt("Enter amount to add");

    if (!amount) return;

    try {

      await axios.post(
        "https://tradeonix.onrender.com/addFunds",
        {
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchFunds();

    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  // ================= WITHDRAW FUNDS =================

  const handleWithdrawFunds = async () => {

    const amount = prompt("Enter amount to withdraw");

    if (!amount) return;

    try {

      await axios.post(
        "https://tradeonix.onrender.com/withdrawFunds",
        {
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchFunds();

    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  if (!funds) return <p>Loading funds...</p>;

  return (
    <>
      <div
        className="funds"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <p>Instant, zero-cost fund transfers with UPI</p>

        <button
          className="btn btn-green"
          onClick={handleAddFunds}
        >
          Add Funds
        </button>

        <button
          className="btn btn-blue"
          onClick={handleWithdrawFunds}
        >
          Withdraw
        </button>
      </div>

      <div className="row">
        <div className="col">

          <span>
            <p>Equity</p>
          </span>

          <div className="table">

            <div className="data">
              <p>Available margin</p>

              <p className="imp colored">
                ₹{funds.availableMargin.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Used margin</p>

              <p className="imp">
                ₹{funds.usedMargin.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Available cash</p>

              <p className="imp">
                ₹{funds.availableCash.toFixed(2)}
              </p>
            </div>

            <hr />

            <div className="data">
              <p>Opening Balance</p>

              <p>
                ₹{funds.openingBalance.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Payin</p>

              <p>
                ₹{funds.payin.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>SPAN</p>

              <p>
                ₹{funds.span.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Delivery margin</p>

              <p>
                ₹{funds.deliveryMargin.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Exposure</p>

              <p>
                ₹{funds.exposure.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Options premium</p>

              <p>
                ₹{funds.optionPremium.toFixed(2)}
              </p>
            </div>

            <hr />

            <div className="data">
              <p>Collateral (Liquid)</p>

              <p>
                ₹{funds.collateralLiquid.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Collateral (Equity)</p>

              <p>
                ₹{funds.collateralEquity.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Total Collateral</p>

              <p>
                ₹
                {(
                  funds.collateralLiquid +
                  funds.collateralEquity
                ).toFixed(2)}
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;