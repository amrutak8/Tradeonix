import React, { useState } from "react";

function CreateTicket() {
  const [openSection, setOpenSection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);


  const data = {
    "Account Opening": {
      "Resident individual": [
        "How to open a Tradeonix demat account online?",
        "Can I open a demat account if I already have a trading account?",
        "What details are required to open an account?",
        "Can I open a Tradeonix account online without Aadhaar linked to a mobile number?",
        "Can I link my demat account from another broker to my Tradeonix trading account?",
        "Can I open an account for a family member or friend using my registered mobile number and email ID?",

      ],
     " Minor" :[
        "Minor account FAQs",
        "How to open a minor account?",
        "What documents are required?",
        "Can I open a Tradeonix account if I'm over 18 but have a minor PAN card?",
        "How to buy or sell securities in minor accounts?",
        "What is legal guardian letter and why is it needed to open minor account?"
      ],
      "Non Resident Indian (NRI)":[
        "What is PIS and how to get PIS permission letter?",
        "What documents are required to convert an NRO PIS account to an NRO Non-PIS account?",
        "How to fill the E-Net form (CBX) to update your PIS account balance in Kite?",
        "Why are funds added to the PIS account not reflected in the Tradeonix account?",
        "How can a PIS account be mapped with Tradeonix?"
      ],
      "Company, Partnership, HUF and LLP": [
        "What are the documents required to open a corporate account?",
        "What are the account opening, brokerage and other transactional charges applicable to a corporate account at Tradeonix?",
        "Will Tradeonix offer higher leverage if a corporate account is held with Tradeonix?",
        "What is the process to close a non individual Tradeonix account?"

      ],
      Glossary:[
        "What is a demat account?",
        "Initial Public Offering (IPO): From Private to Public",
        "SEBI: The regulatory backbone of Indian financial markets",
        "Stock exchanges : The money marketplace"

      ]
    },

    "Your Tradeonix Account": {
      "Your Profile": [
        "Where can I find my Tradeonix account details?",
        "How to change the name in my Tradeonix account?",
        "What is a Basic Service demat Account?",
        "How to close my Tradeonix account?"

      ],
      "Account modification": [
        "How to change the registered email ID and mobile number with Tradeonix?",
        "How can the address registered with Tradeonix be changed online?",
        "What is the procedure for changing the signature at Tradeonix?",
        "How to deactivate F&O, Commodity, or Currency segment?",
        "Why is the error Bank account addition cannot be processed online for your account. Please initiate request offline.displayed?"
    ],
    "Client Master Report (CMR) and Depository Participant (DP)":[
        "What is Client Master Report (CMR), and how to get it?",
        "Why was an email with the updated Client Master Report (CMR) sent by Tradeonix?"
    ],
    "Nomination":[
        "How to add a nominee to the Tradeonix account online?",
         "How to add a nominee(s) to the Tradeonix account offline?",
         "How to update or modify the nominee details in Tradeonix?",
        " What is the inactivity alert?",
         "Can an NRI be added as a nominee to a resident Tradeonix account?",
         "How to verify the nominee(s) details associated with a Tradeonix account?",
         "Why has the exchange or depository sent an email asking to add a nominee to the Tradeonix account?",
         "Why is the error Invalid Pincode displayed while adding a nominee online?"         
    ]
    },

    Kite: {
      IPO: [
        "How to apply for an Initial Public Offering (IPO)?",
         "How to set reminders for upcoming IPOs?",
         "How to pre-apply for an IPO?",
         "How to check the IPO bid and allotment status?",
         "When can IPO orders be placed on Tradeonix?",
         "How to modify the bids in the IPO application?",
         "Is it possible to apply for an IPO without using UPI?"
    ],
    "Trading FAQs":[

        "What is Kite terminal mode?"
    ],
    "Margin Trading Facility (MTF) and Margins":[
        "FAQs for Margin Trading Facility (MTF)",
        "How to buy stocks using Margin Trading Facility (MTF)?",
        "Tradeonix's RMS policy: Squaring off positions for Margin Trading Facility (MTF)",
        "What do the entries in Margin Trading Facility (MTF) ledger mean?"
    ],
    "Charts and orders":[
        "How to Trade From Charts (TFC) on TradingView charts at Tradeonix?",
        "How to open a chart in a new tab on Kite web?",
        "How to switch between charts on Kite?"
    ]
    },

    Funds:{
        "Add money":[
              "How to add money to the Tradeonix account using UPI?",
              "What are the different ways to transfer money to your Tradeonix account?",
              "How to add money to Tradeonix using a cheque?"
        ]
    },
  
    Console: {
      Reports: ["How to download reports?","What is a contract note?","What is a virtual contract note, and how to view it?"],
      Portfolio:[
        "Where can I see my purchased shares on Console?",
        "Why are the purchased shares not displayed on Kite and Console?",
        "Why is the buy average for some shares shown as N/A?"
      ],
      "Corporate actions":[
        "What is a stock split?",  
        " What is consolidation of shares?"
      ]
    },

    Coin: {
    "Features on Coin":[
         "What is an SIP?",
         "How to create a SIP on the Coin app?",
         "How to create a SIP on Coin web?"
    ],
      
      "Fixed Deposit (FD)":[
        "FAQs for Fixed Deposits on Coin",
        "How to invest in Fixed Deposits (FDs) through Tradeonix?"
      ],
      "Mutual funds":[
        "What is my Coin login ID and how to log in to the Coin app?",
        "How to search for mutual funds on Coin?",
        "How to view mutual fund investments on Coin?",
        "How to track the mutual fund portfolio on the Coin app?"
      ]
    },
  };

  
  const currentFAQs = data?.[openSection]?.[selectedItem] || [];

  return (
    <div className="container-fluid px-5 py-5">
      <div className="row">

        {/* LEFT SIDE */}
        <div className={selectedItem ? "col-md-4" : "col-md-6 mx-auto"}>
          {Object.keys(data).map((section) => (
            <div key={section} className="card mb-3 shadow-sm">

              {/* HEADER */}
              <div
                className="d-flex justify-content-between align-items-center p-3"
                style={{ cursor: "pointer", background: "#f7f7f7" }}
                onClick={() => {
                  const isSame = openSection === section;
                  setOpenSection(isSame ? null : section);
                  setSelectedItem(null); 
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <i className="fa fa-plus-circle text-primary"></i>
                  <h6 className="mb-0">{section}</h6>
                </div>

                <i
                  className={`fa ${
                    openSection === section
                      ? "fa-chevron-up"
                      : "fa-chevron-down"
                  }`}
                ></i>
              </div>

              {/* SUB ITEMS */}
              {openSection === section && (
                <li className="list-unstyled p-3">
                  {Object.keys(data[section]).map((item) => (
                    <li
                      key={item}
                      onClick={() => setSelectedItem(item)}
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        borderRadius: "6px",
                        marginBottom: "5px",
                        color:
                          selectedItem === item ? "#0d6efd" : "#333",
                        background:
                          selectedItem === item
                            ? "#eef5ff"
                            : "transparent",
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </li>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        {selectedItem && (
          <div className="col-md-8">

            {/* BREADCRUMB */}
            <p className="text-muted">
              Home &gt; {openSection} &gt; {selectedItem}
            </p>

            <h2 className="mb-4">{selectedItem}</h2>

            <h5 className="mb-3">Online</h5>

            <ul>
              {currentFAQs.length > 0 ? (
                currentFAQs.map((q, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "12px",
                      color: "#0d6efd",
                      cursor: "pointer",
                    }}
                  >
                    {index + 1}. {q}
                  </li>
                ))
              ) : (
                <p className="text-muted">
                  No FAQs available for this section
                </p>
              )}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}

export default CreateTicket;