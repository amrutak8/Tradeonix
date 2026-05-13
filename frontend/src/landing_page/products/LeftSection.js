import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5">
      <div className="row align-items-center product-section">

        
        <div className="col-lg-6 col-md-12 text-center">
          <img
            src={imageURL}
            className="product-image"
            alt={productName}
          />
        </div>

        
        <div className="col-lg-6 col-md-12 p-lg-5 mt-lg-5 text-center text-lg-start">

          <h1>{productName}</h1>

          <p>{productDesription}</p>

          <div className="product-links">
            <a href={tryDemo} style={{ textDecoration: "none" }}>
              Try Demo{" "}
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>

            <a
              href={learnMore}
              style={{
                marginLeft: "30px",
                textDecoration: "none",
              }}
            >
              Learn More{" "}
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>

        
          <div className="store-badges-container mt-4">

            <a href={googlePlay}>
              <img
                src="media/images/googlePlayBadge.svg"
                className="store-badge"
                alt="Google Play"
              />
            </a>

            <a href={appStore}>
              <img
                src="media/images/appstoreBadge.svg"
                className="store-badge"
                alt="App Store"
              />
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;