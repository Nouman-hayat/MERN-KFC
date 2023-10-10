import React from 'react';
import check from '../img/check.png'

export default function OrderComplete() {
  return (
    <div className='container fs-4 text-center my-5 py-5'>
        your order has been placed successfully
        <img src= {check} alt="" className='d-block mx-auto my-4' width="50px"  />
    </div>
  );
}
