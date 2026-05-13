import React, { useState } from "react";

function Hero() {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-light py-5 px-5">
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 ">
        <h1 >Support Portal</h1>
        <button className="btn btn-primary">My tickets</button>
      </div>

      {/* Search Box */}
      <div>
        <div className="input-group">
          <span className="input-group-text bg-white">
            <i className="fa fa-search"></i>
          </span>
          <input
            type="text"
            className="form-control py-3"
            placeholder="Eg: How do I open my account, How do I activate F&O..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ fontSize: "16px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;