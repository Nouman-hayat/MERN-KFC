import React from 'react';
import './PaymentOption.css'

export default function PaymentOption() {
  return (
    <div className='paymentOption-component kfc-card '>
        <h3>PAYMENT OPTION</h3>
        <div className="options-list">
            <div className="option">
                <input type="radio" /> <label htmlFor="">Cash on Delivery (COD)</label>
                
            </div>
            <div className="option-active">
                Your order will be placed and you will make payment at the time of delivery.
            </div>
        </div>
    </div>
  );
}
