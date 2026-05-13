import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  // const [selectedStockUID, setSelectedStockUID] = useState("");

const [isSellOpen, setIsSellOpen] = useState(false);
// const [selectedStock, setSelectedStock] = useState(null);

const [selectedStockData, setSelectedStockData] = useState({});
const [refreshHoldings, setRefreshHoldings] = useState(false);

const handleOpenBuyWindow = (uid, price) => {
  setSelectedStockData({ uid, price });
  setIsBuyWindowOpen(true);
};

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    
  };

const openSellWindow = (uid, price) => {
  setSelectedStockData({ uid, price });
  setIsSellOpen(true);
};

const closeSellWindow = () => {
  setIsSellOpen(false);
  
};

const triggerRefresh = () => {
    setRefreshHoldings(prev => !prev);
  };

  return (
    <GeneralContext.Provider
     value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: openSellWindow,
        closeSellWindow: closeSellWindow,
        triggerRefresh,       
        refreshHoldings
}}
    >
      {props.children}
      {isBuyWindowOpen && (
         <BuyActionWindow 
        uid={selectedStockData.uid} 
       price={selectedStockData.price}
       />
)}

       {isSellOpen && (
       <SellActionWindow 
       uid={selectedStockData.uid} 
       price={selectedStockData.price}
      />
)}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;