import React from 'react'
import './Shipping.css'

export default function Shipping() {

    return (
        <main className="shipping-component container my-5">
            <form action="">
                <label htmlFor="" className="fs-4">Address</label>
                <textarea name="address" className="form-control w-75 mx-auto" id="address" cols="30" rows="5" placeholder="Shipping Address">

                </textarea>
            </form>
        </main>
    )

}
