import React from 'react';

function Awards() {
    return ( 
        <div className='home-page'>
            <div className='row'>
                <div className='col-6 p-5'>
                    <img src='media/images/largestBroker.svg' alt='largestbroker'></img>
                </div>
                <div className='col-6 p-5 mt-3'>
                    <h1>Largest stock broker in India</h1>
                    <p className='mb-5'>2+ million Tradeonix clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:</p>
                       <div className='row'>
                        <div className='col-6'>
                             <ul>
                            <li>Future and Options</li>
                            <li>Commodity derivatives</li>
                            <li>Currency derivative </li>
                        </ul>
                        </div>
                        <div className='col-6'>
                             <ul>
                            <li>Stocks & IPOs</li>
                            <li>Direct mutual funds</li>
                            <li>Bonds and Govt. Securities </li>
                        </ul>
                        </div>
                       </div>
                    
                    <img src='media/images/pressLogos.png' alt='presslogo' style={{width:"90%"}}></img>
                </div>
            </div>
        </div>
     );
}

export default Awards;