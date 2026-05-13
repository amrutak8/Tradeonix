import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, price }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(Number(price) || 0);
  const [isMarket, setIsMarket] = useState(true);

  const generalContext = useContext(GeneralContext);
  const { triggerRefresh } = useContext(GeneralContext);

  useEffect(() => {
    if (isMarket) {
      setStockPrice(price);
    }
  }, [isMarket, price]);

  const handleBuyClick = () => {
    axios.post("https://tradeonix.onrender.com/newOrder", 
      {
      name: uid,
      qty: Number(stockQuantity),
      price: Number(stockPrice),
      mode: "BUY"
    },
    {
    withCredentials: true   
    },
    

  );
     generalContext.triggerRefresh();
    generalContext.closeBuyWindow();
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">

      
      <div className="buy-header">
        <h3>BUY {uid} x {stockQuantity} Qty</h3>

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
              title={isMarket ? "Market price (auto-filled)" : "Enter limit price"}
              className={isMarket ? "disabled-input" : ""}
              onChange={(e) => {
                if (!isMarket) setStockPrice(e.target.value);
              }}
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
        <span>
          Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}
        </span>

        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </button>

          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>

    </div>
  );
};

export default BuyActionWindow;