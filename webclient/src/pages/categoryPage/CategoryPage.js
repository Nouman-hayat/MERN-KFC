import React ,{useState , useEffect} from 'react'
import './CategoryPage.css'
import LeadText from '../../components/LeadText'
import {useParams} from 'react-router-dom'
import ProductCard from '../../components/productCard/ProductCard'



export default function ProductPage() {
    let {slug} = useParams();
    let [products , setProducts] = useState([])


    let getProducts = async ()=>{
        await fetch("http://localhost:8000/kfc/products")
					.then((resp) => resp.json())
					.then((data) => setProducts(data.allProducts));
    }

    useEffect(()=>{
        getProducts()
    },[])

    products = products.filter((f)=>{
        if(f.category===slug)
        return f;
    })
    

    return (
        <div className="product-page">
            <LeadText/>
            <div className="page-content container">
                <div className="featured-products-parent">
                    {products.map((p,index)=> <ProductCard key={index} product={p}/>)}
                </div>
            </div>
        </div>
    )
}
