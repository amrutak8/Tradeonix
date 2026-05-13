import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Tradeonix Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-5">
          <img src="media/images/smallcaseLogo.png" className="universe-logo"/>
          <p className="text-small text-muted">Thematic investment platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/streakLogo.png" className="universe-logo"style={{width:"30%"}}  />
          <p className="text-small text-muted mt-2">Algo & strategy platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/sensibullLogo.svg" className="universe-logo" style={{width:"40%"}} />
          <p className="text-small text-muted mt-3">Options trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/TradeonixFundhouse.png" className="universe-logo" style={{width:"50%"}} />
          <p className="text-small text-muted mt-2">Asset management</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/goldenpiLogo.png" className="universe-logo" style={{width:"50%"}}/>
          <p className="text-small text-muted mt-2">Bonds trading platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/dittoLogo.png" className="universe-logo"style={{width:"30%"}} />
          <p className="text-small text-muted mt-2">Insurance</p>
        </div>
        <Link to="/signup">
         <button
           className="p-2 btn btn-primary fs-5 mb-5 hero-btn"
           
          >
         Signup Now
       </button>
       </Link>
      </div>
    </div>
  );
}

export default Universe;