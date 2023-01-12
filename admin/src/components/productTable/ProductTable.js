import React , {useEffect, useState} from 'react'
import ProductTableRow from '../productTableRow/ProductTableRow'
export default function ProductTable() {

    let serverUrl= "https://kfc-backend.herokuapp.com"
    //GET ALL PRODUCTS FROM DB AND SET THEM
    let [products , setProducts] = useState([])
    let [productFilterKeyword , setProductFilterKeyword] = useState("all")

    let getProducts = async ()=>{
      await fetch(`${serverUrl}/kfc/products`)
      .then(resp=> resp.json())
      .then((data)=>{setProducts(data.allProducts)})
    }

    useEffect(()=>{
        getProducts()
    },[])
    return (
        <div className="product-table-component">
            <div className="table-heading">
              <h2 id="products">Products</h2>
              <select className="filter-box" name="product-filter" id="product-filter" value={productFilterKeyword} onChange={(e)=> setProductFilterKeyword(e.target.value)}>
                <option value="all">All</option>
                <option value="featured">featured</option>
                <option value="everyday-value">Everyday-value</option>
                <option value="make-it-a-meal">Make-it-a-meal</option>
                <option value="signature-box">Signature-box</option>
                <option value="sharing">Sharing</option>
                <option value="promotions">Promotions</option>
                <option value="snacks">snacks</option>
                <option value="midnight-deals">Midnight Deals</option>
              </select>
            </div>

            <div className="table-inner table-inner-prod">
              <div className="table-inner-headings table-inner-prod-headings d-none d-sm-grid">
                <span>Product Name</span>
                <span>Price</span>
                <span>Category</span>
                <span>Stock</span>
              </div>
              {products.filter((el)=>{
                if(productFilterKeyword=="all") return true

                return el.category === productFilterKeyword
              })
              .map((el,index)=> <ProductTableRow key={index} product={el} getProducts={getProducts}/>)}
            </div>
        </div>
    )
}
