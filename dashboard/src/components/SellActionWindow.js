import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../axiosConfig";

import GeneralContext from "./GeneralContext";
import "./SellActionWindow.css";

const SellActionWindow = ({ uid, price }) => {

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(Number(price) || 0);
  const [isMarket, setIsMarket] = useState(true);

  const generalContext = useContext(GeneralContext);
 

 
  useEffect(() => {
    if (isMarket) {
      setStockPrice(price);
    }
  }, [isMarket, price]);

const handleSellClick = async () => {

  try {

    const token = localStorage.getItem("token");

    await axios.post(
      "https://tradeonix.onrender.com/newOrder",
      {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "SELL",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    generalContext.triggerRefresh();

    generalContext.closeSellWindow();

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data?.message || "Sell failed"
    );
  }
};
  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  return (
  <div className="container" id="sell-window" draggable="true">

   
    <div className="sell-header">
      <h3>SELL {uid} x {stockQuantity} Qty</h3>

      <div className="sub-info">
        <span>NSE ₹{stockPrice}</span>
        <span>BSE ₹{(stockPrice + 0.5).toFixed(2)}</span>
      </div>
    </div>

    
 <div className="order-options">
     <label>
  <input type="radio" name="type" defaultChecked />
  <span>Intraday <span className="muted">MIS</span></span>
</label>

<label>
  <input type="radio" name="type" />
  <span>Longterm <span className="muted">CNC</span></span>
</label>
    </div>

    
    <div className="regular-order">

      <div className="inputs">

        <fieldset>
          <legend>Qty.</legend>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>Price</legend>
          <input
            type="number"
            step="0.05"
            value={stockPrice}
            disabled={isMarket}
            onChange={(e) => setStockPrice(e.target.value)}
          />
        </fieldset>

      </div>

      
      <div className="price-options">
        <label>
          <input
            type="radio"
            name="priceType"
            checked={isMarket}
            onChange={() => setIsMarket(true)}
          />
          Market
        </label>

        <label>
          <input
            type="radio"
            name="priceType"
            checked={!isMarket}
            onChange={() => setIsMarket(false)}
          />
          Limit
        </label>
      </div>

    </div>

   
    <div className="buttons">
      <span>Sell value ₹{(stockQuantity * stockPrice).toFixed(2)}</span>

      <div>
        <Link className="btn btn-red" onClick={handleSellClick}>
          Sell
        </Link>

        <Link className="btn btn-grey" onClick={handleCancelClick}>
          Cancel
        </Link>
      </div>
    </div>

  </div>
);
};

export default SellActionWindow;