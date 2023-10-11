import React , {useState , useEffect} from 'react'
import './Table.css'
import OrderTableRow from '../orderTableRow/OrderTableRow';
import ProductTable from '../productTable/ProductTable';
import UserTable from '../userTable/UserTable';
import OrderTable from '../orderTable/OrderTable';

export default function Table() {

    console.log("rendered table component")

    return (
        <main className="table-parent">

          <section className="products-table">
            <ProductTable/>
          </section>

          <section className="orders-table">
            <OrderTable/>
          </section>

          <section className="users-table">
            <UserTable/>
          </section>  
          
        </main>
    )
}
